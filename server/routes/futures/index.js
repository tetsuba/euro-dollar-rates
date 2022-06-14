import express from 'express'
import { deleteFuturesListHandler, getFuturesListHandler, updateFuturesListHandler, getFutureRatesHandler, getFutureGroupsHandler } from './handlers.js'
const Router = express.Router()

Router.get('/api/futures/list', getFuturesListHandler)
/**
 * @swagger
 * /api/futures/list?filter=ED:
 *   get:
 *     description: Gets a list of futures
 *     tags:
 *       - futures
 *     parameters:
 *       - in: query
 *         name: filter
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 date:
 *                   type: string
 *                   example: 01/01/2022
 *                 list:
 *                   type: array
 *                   items:
 *                      type: object
 *                      properties:
 *                        name:
 *                          type: string
 *                          example: edm24
 *                        link:
 *                          type: string
 *                          example: http:www.example.com
 *                        exchange:
 *                          type: string
 *                          example: XCME
 *                        country:
 *                          type: string
 *                          example: UK
 *
 *       500:
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */


Router.get('/api/futures/list/update', updateFuturesListHandler)
/**
 * @swagger
 * /api/futures/list/update:
 *   get:
 *     description: Updates futures saved list
 *     tags:
 *       - futures
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 *       500:
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

Router.get('/api/futures/list/delete', deleteFuturesListHandler)
/**
 * @swagger
 * /api/futures/list/delete:
 *   get:
 *     description: Deletes saved futures list
 *     tags:
 *       - futures
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 *       500:
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

Router.get('/api/futures/list/groups', getFutureGroupsHandler)

Router.get('/api/futures/rates', getFutureRatesHandler)
/**
 * @swagger
 * /api/futures/rates/{symbol}:
 *   get:
 *     description: Gets a list of future rates
 *     tags:
 *       - futures
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 *       500:
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */


export default Router


// app.get('/api/rates/:symbol', async (req, res) => {
//   const json = await getRates(req.params.symbol.toUpperCase())
//   res.json(json)
// })



