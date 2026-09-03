import { treaty } from '@elysia/eden'
import type { App } from '../server/elysia'

// CSR sederhana: Eden Treaty sebagai fetch client murni
// Penting: hanya `import type` dari server, jangan `import { app }`
// sehingga `drizzle-orm/node-postgres` (yang butuh Buffer) tidak pernah ke-bundle client

function getBaseUrl() {
  if (typeof window !== 'undefined') return window.location.origin
  // SSR fallback (jika loader jalan di server, pakai localhost:3000)
  // Di production bisa ganti via env
  return process.env.ORIGIN ?? 'http://localhost:3000'
}

export const api = treaty<App>(getBaseUrl()).api

// Alternatif isomorphic yang lebih optimal (tanpa HTTP saat SSR):
// export const getTreaty = createIsomorphicFn()
//   .server(async () => {
//     const { app } = await import('../server/elysia')
//     return treaty(app).api
//   })
//   .client(() => treaty<App>(getBaseUrl()).api)
// Pakai dynamic import di server agar Vite tidak statis bundle db ke client
