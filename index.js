import express from 'express'
import getEuroDollarRates from './utils/euroDollarRates.js'

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Euro Dollar Rates')
})

app.get('/euro-dollar-rates', async (req, res) => {
  const json = await getEuroDollarRates()
  res.json(json)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
