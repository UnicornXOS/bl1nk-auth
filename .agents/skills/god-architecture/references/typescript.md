# 📘 TypeScript Architecture & Best Practices Guide (2026)

**เวอร์ชัน:** 1.0.0
**สำหรับ:** god-architecture Skill

## 🛠️ Version (Latest 2026)
- **TypeScript:** ^5.7.0
- **tsconfig target:** ES2022+ (Node 18+ / modern browsers)
- **Strict mode:** บังคับเปิดเสมอ (`"strict": true`)
- **Module resolution:** `bundler` (Vite/Next.js) หรือ `NodeNext` (Node.js)

## ⚙️ tsconfig.json ที่แนะนำ

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "paths": {
      "@/*": ["./src/*"]
    },
    "skipLibCheck": true
  }
}
```

## 📐 Type Patterns ที่ควรใช้

### Branded Types (ป้องกัน primitive ผสมกัน)
```typescript
type UserId = string & { readonly _brand: 'UserId' }
type ProductId = string & { readonly _brand: 'ProductId' }

// ป้องกัน: ส่ง ProductId ไปฟังก์ชันที่รับ UserId ไม่ได้
function getUser(id: UserId) { ... }
```

### Discriminated Union (State machine ที่ type-safe)
```typescript
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }
```

### Zod + TypeScript Integration
```typescript
import { z } from 'zod'

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(['admin', 'user'])
})

// infer type จาก schema — ไม่ต้องเขียน type ซ้ำ
type User = z.infer<typeof UserSchema>
```

### satisfies operator (TS 4.9+)
```typescript
// ตรวจ type ตอน define แต่ยังคง literal type ไว้
const config = {
  theme: 'dark',
  lang: 'th'
} satisfies Record<string, string>
```

## 🔴 Anti-patterns ที่พบบ่อย
| Anti-pattern | วิธีแก้ |
|---|---|
| ใช้ `any` | ใช้ `unknown` แล้ว narrow ด้วย type guard |
| Type assertion `as X` บ่อยๆ | แก้ type ให้ถูกต้องตั้งแต่ต้น |
| Interface ซ้อน optional หลายชั้น | ใช้ Discriminated Union แทน |
| ไม่ใช้ `strict: true` | เปิดเสมอ — หา bug ได้ตั้งแต่ compile time |
| Copy-paste type เหมือนกันหลายที่ | ใช้ `z.infer<>` หรือ Utility Types |

## 🔧 Utility Types ที่ใช้บ่อย
```typescript
Partial<T>        // ทุก field optional
Required<T>       // ทุก field required
Pick<T, K>        // เลือกเฉพาะ field
Omit<T, K>        // ตัด field ออก
Readonly<T>       // ห้าม mutate
Record<K, V>      // key-value map
NonNullable<T>    // ตัด null | undefined
ReturnType<F>     // infer return type ของ function
Parameters<F>     // infer parameter types ของ function
```

## 🔗 Reference Links
1. [TypeScript 5.7 Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-7.html)
2. [TypeScript Handbook — Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
3. [Zod — Schema Validation + Type Inference](https://zod.dev)
4. [TypeScript Deep Dive — Best Practices](https://basarat.gitbook.io/typescript/)
5. [Matt Pocock — Total TypeScript Patterns](https://www.totaltypescript.com/tips)
6. [tsconfig Reference](https://www.typescriptlang.org/tsconfig)
7. [TypeScript Performance Tips](https://github.com/microsoft/TypeScript/wiki/Performance)
