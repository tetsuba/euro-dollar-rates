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
  const text = $('.company__name').text()

  if (price !== '') {
    data.push({
      symbol,
      price,
      text: text.replace('Eurodollar 3 Month ', '')
    })
  }


  if (COUNT < EOF) {
    COUNT++
    return await getEuroDollarRates()
  } else {
    COUNT = 0
    return data
  }
}
