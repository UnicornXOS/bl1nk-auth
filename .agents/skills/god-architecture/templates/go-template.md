# Template: Go API Project Structure

## สร้างโปรเจกต์ใหม่
```bash
mkdir my-api && cd my-api
go mod init github.com/username/my-api
go get github.com/gin-gonic/gin
go get github.com/jmoiron/sqlx
```

## Directory Structure
```
my-api/
├── cmd/
│   └── api/
│       └── main.go              # Wire everything here
├── internal/
│   ├── handler/
│   │   ├── handler.go           # Base handler struct
│   │   └── [feature].go
│   ├── service/
│   │   ├── service.go           # Interfaces
│   │   └── [feature].go
│   ├── repository/
│   │   └── [feature].go
│   ├── model/
│   │   └── [feature].go
│   └── middleware/
│       ├── auth.go
│       └── logger.go
├── pkg/
│   ├── config/
│   │   └── config.go
│   └── database/
│       └── postgres.go
├── migrations/
│   ├── 001_create_users.up.sql
│   └── 001_create_users.down.sql
├── Makefile
└── go.mod
```

## Makefile Essentials

```makefile
run:    go run cmd/api/main.go
test:   go test ./... -v -cover
build:  go build -o bin/api cmd/api/main.go
migrate-up:   migrate -path migrations -database "$$DATABASE_URL" up
sqlc-gen:     sqlc generate
```
