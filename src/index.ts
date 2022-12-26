import 'express-async-errors'
import "reflect-metadata"
import express from 'express'
import { AppDataSource } from './data-source'
import { errorMiddleware } from './middlewares/error'
import routes from './router/routes'

AppDataSource.initialize().then(() => {
  const server = express()

  server.use(express.json())
  server.use(routes)

server.use(errorMiddleware)
return server.listen(process.env.PORT)

})

