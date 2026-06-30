# 📘 NestJS Architecture Guide (2026)

**สำหรับ:** god-architecture Skill
**Stack:** NestJS 11, TypeScript, Fastify/Express

## Tech Stack (2026)
- **NestJS:** ^11.0 (Fastify adapter recommended)
- **TypeScript:** ^5.7
- **ORM:** Prisma ^6 / TypeORM ^0.3 / Drizzle
- **Validation:** class-validator + class-transformer
- **Auth:** @nestjs/passport + JWT / @nestjs/jwt
- **Testing:** Jest + Supertest
- **Queue:** BullMQ (@nestjs/bullmq)
- **Cache:** @nestjs/cache-manager + Redis

## Project Structure (Modular)
```
src/
├── main.ts                  # Bootstrap
├── app.module.ts            # Root module
└── [feature]/
    ├── [feature].module.ts  # Feature module
    ├── [feature].controller.ts
    ├── [feature].service.ts
    ├── [feature].repository.ts
    ├── dto/
    │   ├── create-[feature].dto.ts
    │   └── update-[feature].dto.ts
    └── entities/
        └── [feature].entity.ts
```

## Module Pattern
```typescript
// feature.module.ts
@Module({
  imports: [PrismaModule, CacheModule],
  controllers: [FeatureController],
  providers: [FeatureService, FeatureRepository],
  exports: [FeatureService],  // ถ้าต้องการใช้ใน module อื่น
})
export class FeatureModule {}
```

## DTO + Validation
```typescript
// create-feature.dto.ts
export class CreateFeatureDto {
  @IsString() @MinLength(2) name: string
  @IsEmail() email: string
  @IsOptional() @IsInt() @Min(0) age?: number
}
```

## Key Patterns
- **DI:** ใช้ Constructor Injection เสมอ ไม่ใช่ property injection
- **Repository pattern:** แยก DB logic ออกจาก Service
- **Guards:** ใช้ `@UseGuards()` สำหรับ auth/permission
- **Interceptors:** Logging, transform response
- **Pipes:** ValidationPipe global ที่ main.ts
