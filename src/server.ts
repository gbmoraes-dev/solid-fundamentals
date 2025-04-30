import { app } from './app'

import { env } from './env'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP server is running on port ${env.PORT}`)
  })
  .catch((error) => {
    console.error(
      `❌ Failed to start the HTTP server on port ${env.PORT}`,
      error,
    )
  })
