import express from 'express'
import futures from './futures/index.js';
import { errorHandler } from '../errors/middleware.js';

const app = express()
app.use(futures)

// middleware
// TODO: This to be reworked. Look into creating an app file to handle routes and errors
app.use(errorHandler)

export default app