import { Elysia } from 'elysia'
import { openapi } from '@elysia/openapi'
import { auth } from '../lib/auth'
import { exerciseRoute } from '../routes/api/exercise/-route'

// Server-only: file ini JANGAN pernah di-import secara value di client
// Client hanya boleh `import type { App }` agar drizzle/pg tidak ke-bundle
export const app = new Elysia({ prefix: '/api' })
  .use(openapi())
  .mount(auth.handler)
  .use(exerciseRoute)

export type App = typeof app
