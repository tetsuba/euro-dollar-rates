import axios from 'axios';
import cheerio from 'cheerio';
import symbols from './symbols.js';

const BASE_URL = 'https://www.marketwatch.com/investing/future/{symbol}?mod=search_symbol'
const EOF = symbols.length - 1
let COUNT = 0
const data = []

export  default async function getEuroDollarRates() {
  const symbol = symbols[COUNT]
  const url = BASE_URL.replace('{symbol}', symbol)
  const res = await axios(url)
  const $ = cheerio.load(res.data)
  const price = $('.intraday__price > .value').text()
  const date = $('.intraday__close thead th').text()
  const settlementPrice = $('.intraday__close tbody td').text()

  data.push({
    symbol,
    price,
    settlementPrice: {
      date: date.replace('Settlement Price ', ''),
      price: settlementPrice
    }
  })

  if (COUNT < EOF) {
    COUNT++
    return await getEuroDollarRates()
  } else {
    COUNT = 0
    return data
  }
}
