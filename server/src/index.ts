import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()
const port = Number(process.env.PORT ?? 4000)
const allowedOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.disable('x-powered-by')
app.use(helmet())
app.use(cors({
  origin(origin, callback) {
    // Requests without Origin are typically server-to-server or health probes.
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error('Origin is not allowed by CORS'))
  },
}))
app.use(express.json({ limit: '100kb' }))

app.get('/api/health', async (_request, response) => {
  let database: 'connected' | 'unavailable' = 'unavailable'
  try {
    await prisma.$queryRaw\`SELECT 1\`
    database = 'connected'
  } catch {
    // Health endpoint remains available so hosting checks can distinguish
    // a running API from a configured database.
  }

  const healthy = database === 'connected'
  response.status(healthy ? 200 : 503).json({
    status: healthy ? 'ok' : 'degraded',
    service: 'stroi-universal-api',
    database,
    timestamp: new Date().toISOString(),
  })
})

app.use((_request, response) => {
  response.status(404).json({ error: 'Маршрут не найден' })
})

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  if (error instanceof Error && error.message === 'Origin is not allowed by CORS') {
    response.status(403).json({ error: 'Источник запроса не разрешён' })
    return
  }
  response.status(500).json({ error: 'Внутренняя ошибка сервера' })
})

const server = app.listen(port, () => {
  console.log(`СтройуниВЕРсал API запущен на порту ${port}`)
})

async function shutdown() {
  server.close()
  await prisma.$disconnect()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
