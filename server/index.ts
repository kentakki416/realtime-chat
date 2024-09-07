import { ExpressServer } from './src/4-infrastructure/server/server'

(() => {
  const apiPort = 8080
  const apiServer = new ExpressServer(apiPort)
  apiServer.start()
})()
