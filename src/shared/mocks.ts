import { setupWorker } from 'msw'
import { setupServer } from 'msw/node'

import { authHandlers } from '@/features/auth'

const handlers = [...authHandlers]

async function initMocks() {
  if (typeof window === 'undefined') {
    const server = setupServer(...handlers)

    server.listen({
      onUnhandledRequest: 'bypass'
    })
  } else {
    const worker = setupWorker(...handlers)

    await worker.start({
      quiet: true,
      onUnhandledRequest: 'bypass'
    })
  }
}

initMocks()

export {}
