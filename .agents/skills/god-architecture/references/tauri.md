# 📘 Tauri 2 + Rust Architecture Guide (2026)

**สำหรับ:** god-architecture Skill
**Stack:** Tauri 2.x, Rust (latest stable), React/Svelte/Vue frontend

## Tech Stack (2026)
- **Tauri:** ^2.0 (IPC v2, Capabilities system)
- **Rust:** 1.80+ (edition 2021)
- **Frontend:** React 19 / SvelteKit / Vue 3 (via Vite)
- **State (Rust):** `tokio`, `serde`, `tauri-plugin-store`
- **State (JS):** Zustand / Svelte stores
- **DB (local):** SQLite via `rusqlite` / `sqlx`
- **HTTP:** `reqwest` (Rust-side), `fetch` (JS-side)

## Project Structure
```
src-tauri/
├── src/
│   ├── main.rs          # Tauri app entry
│   ├── lib.rs           # Plugin registration
│   └── commands/        # #[tauri::command] handlers
│       ├── mod.rs
│       └── [feature].rs
├── Cargo.toml
├── tauri.conf.json      # App config + capabilities
└── capabilities/        # Permission definitions (Tauri 2)

src/                     # Frontend (React/Svelte/Vue)
├── components/
├── stores/              # JS-side state
└── lib/
    └── ipc.ts           # Type-safe IPC wrappers
```

## IPC Pattern (Tauri 2)
```rust
// src-tauri/src/commands/user.rs
#[tauri::command]
async fn get_user(id: u32, state: tauri::State<'_, AppState>) -> Result<User, String> {
    state.db.get_user(id).await.map_err(|e| e.to_string())
}
```
```typescript
// src/lib/ipc.ts — type-safe wrapper
import { invoke } from '@tauri-apps/api/core'
export const getUser = (id: number) => invoke<User>('get_user', { id })
```

## Capabilities (Tauri 2 Permission System)
```json
// src-tauri/capabilities/main.json
{
  "identifier": "main-capability",
  "windows": ["main"],
  "permissions": ["core:default", "fs:read-all", "shell:open"]
}
```

## Key Patterns
- ใช้ `AppState` struct สำหรับ shared state (thread-safe ด้วย `Arc<Mutex<>>`)
- IPC ทุก call ต้องมี type definition ทั้ง Rust และ TypeScript
- Error handling: Rust `Result<T, String>` → JS `try/catch invoke()`
- Plugin: ใช้ `tauri-plugin-store` สำหรับ persistent local storage
