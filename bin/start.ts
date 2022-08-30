import { createServer } from 'http'
import { config } from 'dotenv'
import process from 'node:process'
import { createServiceContainer } from '../src/container'
import { createService } from '../src/service'

const gracefulShutdown = (cb: () => Promise<void>): void => {
  const events = ['SIGINT', 'SIGTERM', 'uncaughtException']
  events.forEach((event) => {
    process.on(event, async (args: unknown) => {
      // eslint-disable-next-line no-console
      console.log(`${event} signal received. ${args}`)
      try {
        await cb()
      } catch (err) {
        process.exit(1)
      }

      process.exit(0)
    })
  })
}

const main = async () => {
  config()

  const hostname = '0.0.0.0'
  const port = Number(process.env.INTERVIEW_PORT) || 4000
  const container = createServiceContainer()
  const service = createService(container)

  const server = createServer(service).listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`server is running at: ${hostname}:${port}`)
  })

  gracefulShutdown(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) {
          reject(err.message)
        } else {
          resolve()
        }
      })
    })
  })
}

main()
