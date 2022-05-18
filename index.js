import express from 'express'
import cheerio from 'cheerio'
import getEuroDollarRates from './utils/euroDollarRates.js'

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Euro Dollar Rates')
})

app.get('/euro-dollar-rates', async (req, res) => {
  const data = await getEuroDollarRates()
  const template = `
    <table>
        <tr><th>Date</th><th>Price</th></tr>
        ${data.map((data) => `<tr><td>${data.text}</td><td>${data.price}</td></tr>`)}
    </table>
  `

  const $ = cheerio.load(template);
  res.send($.html())
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
