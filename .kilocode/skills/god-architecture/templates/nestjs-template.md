# Template: NestJS Project Structure

## สร้างโปรเจกต์ใหม่

```bash
npm i -g @nestjs/cli
nest new my-api --package-manager pnpm
cd my-api
nest generate module [feature]
nest generate controller [feature]
nest generate service [feature]
```

## Directory Structure

```text
my-api/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── common/
│   │   ├── filters/             # Exception filters
│   │   ├── guards/              # Auth guards
│   │   ├── interceptors/        # Logging, transform
│   │   └── pipes/               # Validation pipes
│   ├── config/
│   │   └── configuration.ts     # ConfigModule
│   ├── database/
│   │   └── prisma.service.ts
│   └── [feature]/
│       ├── [feature].module.ts
│       ├── [feature].controller.ts
│       ├── [feature].service.ts
│       ├── dto/
│       └── entities/
├── test/
│   └── [feature].e2e-spec.ts
└── prisma/
    └── schema.prisma
```
