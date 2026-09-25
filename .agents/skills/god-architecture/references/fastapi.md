# 🐍 FastAPI Architecture & Best Practices Guide (2026)

**เวอร์ชัน:** 2.0.0 (Updated for FastAPI 0.128+ & Pydantic V2)
**สำหรับ:** god-architecture Skill

## 🛠️ Tech Stack (Latest 2026)
- **FastAPI:** ^0.128.0+
- **Python:** ^3.12.0 - 3.13.0
- **Pydantic:** ^2.10.0+ (V2)
- **SQLAlchemy:** ^2.0.0+ (Async) / SQLModel ^0.0.30+
- **Alembic:** ^1.14.0+
- **Auth:** PyJWT ^2.10.0+ / FastAPI-Users ^14.0.0+
- **Validation:** Pydantic / Zod (via Python bindings)

## 📁 Project Structure (Clean Architecture)
```text
app/
├── api/                 # API Layer (Routers, Endpoints)
│   ├── v1/
│   │   ├── endpoints/
│   │   └── api.py
│   └── deps.py          # Dependencies (DI)
├── core/                # Core Config & Settings
│   ├── config.py
│   ├── security.py
│   └── events.py
├── crud/                # CRUD Operations (Data Access)
├── models/              # Database Models (SQLAlchemy/SQLModel)
├── schemas/             # Data Validation Schemas (Pydantic)
├── services/            # Business Logic Layer
├── db/                  # Database Connection & Sessions
├── tests/               # Unit & Integration Tests
└── main.py              # Entry Point
```

## 🔗 Reference Links (10+)
1. [FastAPI Official Documentation (Tutorial)](https://fastapi.tiangolo.com/tutorial/)
2. [FastAPI Best Practices (Production)](https://fastapi.tiangolo.com/advanced/best-practices/)
3. [Pydantic V2 Migration & Performance Guide](https://docs.pydantic.dev/latest/migration/)
4. [SQLAlchemy 2.0 Async Guide for FastAPI](https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html)
5. [SQLModel (FastAPI + Pydantic + SQLAlchemy)](https://sqlmodel.tiangolo.com/)
6. [Alembic Database Migrations with FastAPI](https://alembic.sqlalchemy.org/en/latest/tutorial.html)
7. [FastAPI-Users for Authentication & Security](https://fastapi-users.github.io/fastapi-users/)
8. [Pytest & HTTPX for FastAPI Testing](https://fastapi.tiangolo.com/tutorial/testing/)
9. [Dockerizing FastAPI with Poetry/uv (2026)](https://fastapi.tiangolo.com/deployment/docker/)
10. [FastAPI Background Tasks & Celery Integration](https://fastapi.tiangolo.com/tutorial/background-tasks/)
11. [Monitoring FastAPI with Prometheus & Grafana](https://fastapi.tiangolo.com/advanced/middleware/#prometheus)
12. [FastAPI Middleware & Exception Handling Patterns](https://fastapi.tiangolo.com/tutorial/handling-errors/)
