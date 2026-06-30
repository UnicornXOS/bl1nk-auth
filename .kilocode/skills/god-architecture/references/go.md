# 📘 Go + Gin/Chi Architecture Guide (2026)

**สำหรับ:** god-architecture Skill
**Stack:** Go 1.23+, Gin / Chi, SQLC / GORM

## Tech Stack (2026)
- **Go:** 1.23+ (range over func, improved toolchain)
- **Router:** Gin ^1.10 / Chi ^5
- **DB:** `database/sql` + SQLC (recommended) / GORM v2
- **Validation:** `go-playground/validator`
- **Config:** `viper` / `godotenv`
- **Migration:** `golang-migrate`
- **Testing:** `testify` + httptest
- **Build:** `ko` / Docker multi-stage

## Project Structure (Standard Layout)
```
cmd/
└── api/
    └── main.go              # Entry point

internal/
├── handler/                 # HTTP handlers (thin layer)
│   └── [feature].go
├── service/                 # Business logic
│   └── [feature].go
├── repository/              # DB access
│   └── [feature].go
├── model/                   # Domain types
│   └── [feature].go
└── middleware/              # Auth, logging, cors

pkg/                         # Public packages
├── config/
├── database/
└── validator/

migrations/                  # SQL migration files
```

## Handler Pattern
```go
// internal/handler/user.go
func (h *UserHandler) GetUser(c *gin.Context) {
    id := c.Param("id")
    user, err := h.service.GetUser(c.Request.Context(), id)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, user)
}
```

## Key Patterns
- **Error handling:** ส่ง `error` กลับเสมอ ไม่ panic ใน business logic
- **Context:** ส่ง `ctx context.Context` เป็น param แรกทุกฟังก์ชัน
- **Repository interface:** define interface ใน service layer ไม่ใช่ repository layer
- **Dependency Injection:** Manual DI ใน `main.go` (ไม่ต้องใช้ framework)
- **SQLC:** generate type-safe DB code จาก SQL queries แทน ORM
