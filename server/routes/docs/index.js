import express from 'express'
import path from 'path'
const Router = express.Router()

import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

const port = process.env.PORT || 3001

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Financial Scraper API',
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:" + port,
        description: "Financial Scraper API",
      },
    ],
  },
  apis: [path.join(process.cwd(), 'server', 'routes/futures/index.js')], // files containing annotations as above
};
// TODO: fix file paths

const openapiSpecification = swaggerJsdoc(options)

Router.use('/api-docs', swaggerUi.serve)
Router.get('/api-docs', swaggerUi.setup(openapiSpecification))

export default Router