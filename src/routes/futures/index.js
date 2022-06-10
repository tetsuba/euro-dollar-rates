import express from 'express'
import { deleteFuturesListHandler, getFuturesListHandler, updateFuturesListHandler } from './handlers.js'
const Router = express.Router()

Router.get('/api/futures/list', getFuturesListHandler)
Router.get('/api/futures/list/update', updateFuturesListHandler)
Router.get('/api/futures/list/delete', deleteFuturesListHandler)
Router.get('/api/futures/list/rates')

export default Router


// app.get('/api/rates/:symbol', async (req, res) => {
//   const json = await getRates(req.params.symbol.toUpperCase())
//   res.json(json)
// })
//


