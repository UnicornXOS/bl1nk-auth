# Repository Guidelines

## Project Structure & Module Organization

- `app/` holds Next.js App Router routes; `app/login` is the primary UI, `app/api` exposes auth handlers, and `app/.well-known` publishes JWKS metadata.
- `lib/` contains reusable auth utilities (key lifecycle, environment helpers); keep exports pure and documented at the call site.
- `config/clients.json` tracks registered clients and redirect URIs; update it alongside consumer services.
- `.env.local` carries runtime secrets; mirror every addition in `.env.example` so agents know which variables to provide.

## Build, Test, and Development Commands

- `npm run dev` starts the dev server on `http://localhost:8787` with hot reloading.
- `npm run build` produces the optimized production bundle in `.next/`.
- `npm run start` serves the built bundle; run it after a successful build for smoke checks.
- `npm run gen:key` runs `scripts/gen-key.ts` to generate RSA key material and suggested `.env` entries.

## Coding Style & Naming Conventions

- Write TypeScript with ES modules, two-space indentation, and explicit semicolons (see `lib/crypto.ts`).
- React components stay in PascalCase files exporting a default function; shared helpers use camelCase named exports.
- Keep inline object literals compact unless readability suffers and favor descriptive prop names over abbreviations.
- When introducing config, update both `config/clients.json` and `.env.example` in the same change.

## Testing Guidelines

- Automated tests are not yet wired; place new suites under the feature directory (e.g., `app/login/__tests__/login.spec.ts`).
- Document how to execute added tests via `npm test` or a dedicated script, and capture coverage goals in the PR.
- Include manual verification notes in PRs (e.g., `curl http://localhost:8787/api/login?client=demo`).

## Commit & Pull Request Guidelines

- Use concise, imperative commit subjects (e.g., `Add JWKS refresh hook`) and squash before publishing branches.
- PRs must explain intent, list testing evidence, and flag configuration or migration steps; add screenshots or curl snippets when UX changes.
- Link to tracking issues when available and tag reviewers responsible for the touched areas (`app/**`, `lib/**`).

## Security & Configuration Tips

- Treat RSA material as secrets. Never commit generated PEMs; refresh locally with `npm run gen:key`.
- Rotate `AUTH_KEY_KID` when rolling keys and confirm `/.well-known/jwks.json` serves the new key set before release.
- Double-check `.env.local` for stray variables before staging changes.

# webhook-bl1nk

# โปรเจ็กต์ Webhook แบบครบวงจรสำหรับ Vercel - พร้อมใช้งานทันที

```
├── app/
│   ├── api/
│   │   ├── webhook/
│   │   │   └── route.js
│   │   ├── worker/
│   │   │   └── route.js
│   │   └── dashboard/
│   │       └── route.js
│   ├── dashboard/
│   │   └── page.js
│   └── layout.js
├── lib/
│   ├── queue.js
│   ├── logger.js
│   ├── integrations/
│   │   ├── notion.js
│   │   ├── github.js
│   │   └── custom.js
│   └── ratelimiter.js
├── .env.example
├── package.json
└── vercel.json
```

## 1. ตั้งค่าพื้นฐาน

### `.env.example` (คัดลอกเป็น `.env.local` แล้วกรอกข้อมูลจริง)

```env
# จำเป็นต้องตั้งค่าใน Vercel Dashboard หลัง deploy
WEBHOOK_SECRET=your_strong_secret_here
UPSTASH_REDIS_URL=your_upstash_redis_url
UPSTASH_REDIS_TOKEN=your_upstash_redis_token
NOTION_API_KEY=secret_...
GITHUB_TOKEN=ghp_...
LOGTAIL_TOKEN=your_logtail_token
```

### `package.json`

```json
{
  "name": "webhook-system",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@upstash/redis": "^1.20.7",
    "@upstash/ratelimit": "^1.2.0",
    "@notionhq/client": "^1.3.1",
    "@octokit/rest": "^19.0.12",
    "bullmq": "^3.20.0",
    "logtail": "^1.4.0",
    "next": "^13.5.6",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "winston": "^3.10.0"
  }
}
```

## 2. ระบบ Rate Limiting แบบใช้งานได้จริง

### `lib/ratelimiter.js`

```javascript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// สร้าง Redis client สำหรับ rate limiting
const redis = Redis.fromEnv();

// ตั้งค่า rate limit: 10 requests ต่อนาที ต่อ IP
export const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "60 s"),
  analytics: true,
  prefix: "@webhook/ratelimit",
});
```

## 3. Webhook Handler หลัก

### `app/api/webhook/route.js`

```javascript
import { ratelimit } from "@/lib/ratelimiter";
import { addWebhookToQueue } from "@/lib/queue";
import { logger } from "@/lib/logger";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  // 1. ตรวจสอบ rate limit
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  if (!success) {
    logger.warn("Rate limit exceeded", { ip, limit, remaining, reset });
    return new Response(
      JSON.stringify({
        error: "Rate limit exceeded",
        reset: new Date(reset).toISOString(),
      }),
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit,
          "X-RateLimit-Remaining": remaining,
          "X-RateLimit-Reset": reset,
        },
      },
    );
  }

  // 2. ตรวจสอบ secret header
  const secret = req.headers.get("x-webhook-secret");
  if (secret !== process.env.WEBHOOK_SECRET) {
    logger.error("Invalid webhook secret", {
      ip,
      receivedSecret: secret ? "***" : "missing",
    });
    return new Response(JSON.stringify({ error: "Invalid secret" }), {
      status: 401,
    });
  }

  try {
    // 3. อ่านและแปลง body
    const buffer = await req.arrayBuffer();
    const body = Buffer.from(buffer).toString("utf-8");

    let payload;
    try {
      payload = JSON.parse(body);
    } catch (e) {
      logger.error("Invalid JSON payload", {
        ip,
        body: body.substring(0, 200),
      });
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
      });
    }

    // 4. ระบุ provider จาก header
    const provider = req.headers.get("x-provider");
    if (!["notion", "github", "custom"].includes(provider)) {
      logger.warn("Unsupported provider", { ip, provider });
      return new Response(
        JSON.stringify({
          error: "Unsupported provider",
          supported: ["notion", "github", "custom"],
        }),
        { status: 400 },
      );
    }

    // 5. เพิ่มงานเข้าคิวทันที
    await addWebhookToQueue({
      provider,
      payload,
      ip,
      timestamp: Date.now(),
    });

    // 6. ตอบกลับทันทีว่ารับข้อมูลแล้ว
    return new Response(
      JSON.stringify({
        status: "accepted",
        message: "Webhook enqueued for processing",
      }),
      {
        status: 202,
      },
    );
  } catch (error) {
    logger.error("Webhook processing error", {
      error: error.message,
      stack: error.stack,
    });
    return new Response(
      JSON.stringify({
        error: "Internal server error",
      }),
      {
        status: 500,
      },
    );
  }
}
```

## 4. ระบบคิวแบบ Serverless ที่ทำงานได้จริงกับ Vercel

### `lib/queue.js`

```javascript
import { Queue, Worker } from "bullmq";
import { Redis } from "@upstash/redis";
import { logger } from "./logger";
import {
  processNotionWebhook,
  processGithubWebhook,
  processCustomWebhook,
} from "./integrations";

// สร้าง Redis client สำหรับ BullMQ
const redis = Redis.fromEnv();
export const connection = {
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
};

// สร้าง queue สำหรับ webhook
export const webhookQueue = new Queue("webhook-queue", {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 2000 },
    removeOnComplete: 100,
    removeOnFail: 20,
  },
});

// ฟังก์ชันเพิ่ม webhook เข้าคิว
export async function addWebhookToQueue(data) {
  return webhookQueue.add("webhook-job", data);
}

// สร้าง worker สำหรับประมวลผลคิว
// ใช้ใน worker route (app/api/worker/route.js)
export function createWorker() {
  return new Worker(
    "webhook-queue",
    async (job) => {
      logger.info("Processing webhook job", {
        jobId: job.id,
        provider: job.data.provider,
        attempts: job.attemptsMade,
      });

      try {
        switch (job.data.provider) {
          case "notion":
            await processNotionWebhook(job.data.payload);
            break;
          case "github":
            await processGithubWebhook(job.data.payload);
            break;
          case "custom":
            await processCustomWebhook(job.data.payload);
            break;
          default:
            throw new Error(`Unsupported provider: ${job.data.provider}`);
        }

        logger.info("Webhook processed successfully", {
          jobId: job.id,
          provider: job.data.provider,
        });
      } catch (error) {
        logger.error("Webhook processing failed", {
          jobId: job.id,
          provider: job.data.provider,
          error: error.message,
          stack: error.stack,
        });
        throw error; // BullMQ จะลองใหม่ตามที่กำหนด
      }
    },
    {
      connection,
      autorun: false, // เราจะเรียก worker.run() เองใน worker route
    },
  );
}

// ฟังก์ชันสำหรับตรวจสอบสถานะคิว
export async function getQueueStats() {
  const [waiting, active, completed, failed] = await Promise.all([
    webhookQueue.getWaitingCount(),
    webhookQueue.getActiveCount(),
    webhookQueue.getCompletedCount(),
    webhookQueue.getFailedCount(),
  ]);

  return {
    waiting,
    active,
    completed,
    failed,
    total: waiting + active + completed + failed,
  };
}
```

## 5. Worker สำหรับประมวลผลคิว (แบบ Serverless)

### `app/api/worker/route.js`

```javascript
import { createWorker } from "@/lib/queue";
import { logger } from "@/lib/logger";

// ตั้งค่าให้ worker ทำงานแค่ 10 วินาทีต่อ request
// เพื่อหลีกเลี่ยงปัญหา timeout ของ Vercel
const MAX_PROCESSING_TIME = 9000; // 9 วินาที

export const dynamic = "force-dynamic";

export async function GET() {
  const start = Date.now();
  const worker = createWorker();

  try {
    // รัน worker จนกว่าจะหมดงานหรือถึงเวลาที่กำหนด
    await new Promise((resolve) => {
      const timer = setTimeout(resolve, MAX_PROCESSING_TIME);

      worker.on("completed", (job) => {
        if (Date.now() - start > MAX_PROCESSING_TIME - 1000) {
          clearTimeout(timer);
          resolve();
        }
      });

      worker.on("drained", () => {
        clearTimeout(timer);
        resolve();
      });

      worker.run().catch((err) => {
        logger.error("Worker error", { error: err.message });
        clearTimeout(timer);
        resolve();
      });
    });

    const stats = await worker.getWorkerStats();
    logger.info("Worker processed jobs", stats);

    return new Response(
      JSON.stringify({
        status: "success",
        processed: stats.processed,
        duration: Date.now() - start,
      }),
      { status: 200 },
    );
  } catch (error) {
    logger.error("Worker processing error", {
      error: error.message,
      stack: error.stack,
    });
    return new Response(
      JSON.stringify({
        error: "Worker processing failed",
      }),
      { status: 500 },
    );
  } finally {
    await worker.close();
  }
}
```

## 6. การบูรณาการกับบริการต่างๆ

### `lib/integrations/github.js`

```javascript
import { Octokit } from "@octokit/rest";
import { logger } from "../logger";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function processGithubWebhook(payload) {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN environment variable is not set");
  }

  try {
    // ตัวอย่างการประมวลผล GitHub webhook
    if (payload.action === "opened" && payload.issue) {
      await octokit.issues.createComment({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        issue_number: payload.issue.number,
        body: "ขอบคุณที่สร้าง issue! ทีมงานจะรีวิวเร็วๆ นี้",
      });

      logger.info("GitHub comment added", {
        repo: `${payload.repository.owner.login}/${payload.repository.name}`,
        issue: payload.issue.number,
      });
    }

    // สามารถเพิ่มเงื่อนไขสำหรับ event อื่นๆ ได้ที่นี่
  } catch (error) {
    logger.error("GitHub integration error", {
      error: error.message,
      repo: payload.repository?.full_name,
      event: payload.action,
    });
    throw error;
  }
}
```

### `lib/integrations/notion.js`

```javascript
import { Client } from "@notionhq/client";
import { logger } from "../logger";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function processNotionWebhook(payload) {
  if (!process.env.NOTION_API_KEY) {
    throw new Error("NOTION_API_KEY environment variable is not set");
  }

  try {
    // ตัวอย่างการสร้างหน้าใน Notion
    if (payload.type === "new_task") {
      await notion.pages.create({
        parent: { database_id: process.env.NOTION_TASKS_DB_ID },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: payload.title,
                },
              },
            ],
          },
          Status: {
            select: {
              name: "Pending",
            },
          },
        },
      });

      logger.info("Notion task created", {
        databaseId: process.env.NOTION_TASKS_DB_ID,
        title: payload.title,
      });
    }

    // สามารถเพิ่มเงื่อนไขสำหรับ payload type อื่นๆ ได้
  } catch (error) {
    logger.error("Notion integration error", {
      error: error.message,
      databaseId: process.env.NOTION_TASKS_DB_ID,
    });
    throw error;
  }
}
```

## 7. ระบบ Logging แบบละเอียด

### `lib/logger.js`

```javascript
import { createLogger, format, transports } from "winston";
import { Logtail } from "@logtail/node";

const { combine, timestamp, printf, errors } = format;

// สร้าง formatter แบบกำหนดเอง
const myFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}] ${message}`;

  if (metadata && Object.keys(metadata).length > 0) {
    msg += ` ${JSON.stringify(metadata)}`;
  }

  return msg;
});

// สร้าง logger instance
const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    myFormat,
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new transports.File({
      filename: "logs/combined.log",
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: "logs/exceptions.log",
    }),
  ],
});

// เพิ่ม Logtail transport หากมี token
if (process.env.LOGTAIL_TOKEN) {
  const logtail = new Logtail(process.env.LOGTAIL_TOKEN);
  logger.add(
    new transports.Http({
      host: "in.logtail.com",
      path: `/v1/${process.env.LOGTAIL_TOKEN}`,
      ssl: true,
      format: format.json(),
    }),
  );
}

export { logger };
```

## 8. Dashboard สำหรับตรวจสอบสถานะ

### `app/dashboard/page.js`

```javascript
import { getQueueStats } from "@/lib/queue";
import { logger } from "@/lib/logger";

export default async function Dashboard() {
  let stats = {
    waiting: 0,
    active: 0,
    completed: 0,
    failed: 0,
    total: 0,
  };

  try {
    stats = await getQueueStats();
  } catch (error) {
    logger.error("Dashboard stats error", { error: error.message });
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Webhook Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Waiting" value={stats.waiting} color="blue" />
        <StatCard title="Active" value={stats.active} color="yellow" />
        <StatCard title="Completed" value={stats.completed} color="green" />
        <StatCard title="Failed" value={stats.failed} color="red" />
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Queue Status</h2>
        <div className="h-64 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500">Queue visualization would go here</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Errors</h2>
        <ErrorList />
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <p className={`text-3xl font-bold mt-2 ${colors[color]}`}>{value}</p>
    </div>
  );
}

async function ErrorList() {
  // ในทางปฏิบัติ ควรดึงข้อมูลจาก database หรือ logging service
  const errors = [
    {
      id: 1,
      time: "2023-10-15 14:30",
      message: "GitHub API rate limit exceeded",
      provider: "github",
    },
    {
      id: 2,
      time: "2023-10-15 12:15",
      message: "Invalid Notion database ID",
      provider: "notion",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Provider
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Error
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {errors.map((error) => (
            <tr key={error.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {error.time}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {error.provider}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {error.message}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900">
                  Retry
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## 9. การตั้งค่าและ Deploy บน Vercel

### ขั้นตอนการตั้งค่า

1. **สร้างโปรเจ็กต์ Next.js**

   ```bash
   npx create-next-app@latest webhook-system
   cd webhook-system
   ```

2. **ติดตั้ง dependencies ที่จำเป็น**

   ```bash
   npm install @upstash/redis @upstash/ratelimit @notionhq/client @octokit/rest bullmq logtail winston
   ```

3. **สร้าง Upstash Redis บน Vercel**
   - เข้าไปที่ Vercel Dashboard
   - ไปที่โปรเจ็กต์ > Settings > Integrations
   - ค้นหา "Upstash" และติดตั้ง
   - สร้าง Redis database ใหม่

4. **ตั้งค่า Environment Variables ใน Vercel**

   ```env
   WEBHOOK_SECRET=your_strong_secret_here
   UPSTASH_REDIS_URL=your_upstash_redis_url
   UPSTASH_REDIS_TOKEN=your_upstash_redis_token
   NOTION_API_KEY=secret_...
   GITHUB_TOKEN=ghp_...
   LOGTAIL_TOKEN=your_logtail_token
   NOTION_TASKS_DB_ID=your_notion_database_id
   ```

   - ตั้งค่าใน Vercel Dashboard: Project Settings > Environment Variables

5. **ตั้งค่า Rate Limiting ใน Vercel (เพิ่มเติม)**
   - ใช้ Upstash Ratelimit ที่เราตั้งค่าในโค้ด หรือ
   - ตั้งค่า Rate Limiting ใน Vercel Firewall สำหรับ endpoint หลัก

6. **Deploy ไปยัง Vercel**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   vercel --prod
   ```

### ขั้นตอนการทดสอบ

1. **ตั้งค่า Webhook บน GitHub**
   - ไปที่ repository settings > Webhooks
   - Payload URL: `https://your-vercel-app.vercel.app/api/webhook`
   - Content type: `application/json`
   - Secret: ใช้ค่าจาก `WEBHOOK_SECRET`
   - Events: เลือกตามต้องการ

2. **ตั้งค่า Webhook บน Notion**
   - สร้าง integration ใน Notion developer portal
   - ตั้งค่า redirect URL เป็น `https://your-vercel-app.vercel.app/api/webhook`
   - ใช้ `x-webhook-secret` header สำหรับยืนยันตัวตน

3. **ตรวจสอบ Dashboard**
   - เข้าถึงผ่าน `https://your-vercel-app.vercel.app/dashboard`
