import express from 'express'
import futures from './futures/index.js'
import { errorHandler } from '../errors/middleware.js'
const app = express()

// routes
app.use(futures)

// middleware
app.use(errorHandler)

export default app
