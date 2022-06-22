import express from 'express'
import {
    deleteFuturesListHandler,
    getFuturesListHandler,
    updateFuturesListHandler,
    getFutureHandler,
} from './handlers.js'
const Router = express.Router()

Router.get('/api/futures/list', getFuturesListHandler)
/**
 * @swagger
 * /api/futures/list:
 *   get:
 *     description: Gets a list of futures
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

Router.get('/api/future/:symbol', getFutureHandler)
/**
 * @swagger
 * /api/future/{symbol}:
 *   get:
 *     description: Gets data on a specific future
 *     summary: "Find future by symbol"
 *     tags:
 *       - future
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         type: string
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
 *                 name:
 *                   type: string
 *                   example: EuroDollar 3 Months
 *                 list:
 *                   type: array
 *                   items:
 *                      type: object
 *                      properties:
 *                        name:
 *                          type: string
 *                          example: EuroDollar 3 Months
 *                        symbol:
 *                          type: string
 *                          example: ED
 *                        price:
 *                          type: string
 *                          example: 80
 *                        month:
 *                          type: string
 *                          example: 6
 *                        year:
 *                          type: string
 *                          example: 2022
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
