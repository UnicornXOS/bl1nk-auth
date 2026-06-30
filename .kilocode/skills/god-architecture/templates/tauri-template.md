# Template: Tauri 2 + React Project Structure

## สร้างโปรเจกต์ใหม่
```bash
npm create tauri-app@latest my-app -- --template react-ts
cd my-app && npm install
```

## Directory Structure
```
my-app/
├── src/                          # React frontend
│   ├── components/
│   ├── stores/                   # Zustand stores
│   ├── lib/
│   │   └── ipc.ts               # Type-safe IPC wrappers
│   └── App.tsx
├── src-tauri/
│   ├── src/
│   │   ├── main.rs
│   │   ├── lib.rs
│   │   └── commands/
│   │       └── mod.rs
│   ├── capabilities/
│   │   └── main.json
│   ├── Cargo.toml
│   └── tauri.conf.json
├── package.json
└── vite.config.ts
```

## IPC Type Convention
```typescript
// src/lib/ipc.ts
import { invoke } from '@tauri-apps/api/core'

// ทุก IPC call ต้องมี type
export const commands = {
  getData: (id: number) => invoke<DataType>('get_data', { id }),
  saveData: (data: CreateData) => invoke<void>('save_data', { data }),
}
```
