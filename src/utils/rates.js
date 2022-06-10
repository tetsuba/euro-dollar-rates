import axios from 'axios'
import cheerio from 'cheerio'
import fs from 'fs'
import { getFuturesList } from './futures.js'

const BASE_URL = 'https://www.marketwatch.com'
const rates = {
  date: undefined,
  data: []
}

let EOF = 0
let COUNT = 0
let LIST = undefined

async function getRatesFromFile(fileName) {
  let rates = { date: '' }

  if(fs.existsSync(fileName)) {
    let data = await fs.readFileSync(fileName)
    rates = JSON.parse(data)
  } else {
    console.log("File not found")
  }
  return rates
}

async function getRatesFromURL() {
  const symbol = LIST[COUNT].name
  const url = BASE_URL + LIST[COUNT].link
  console.log(url)
  const res = await axios(url)
  const $ = cheerio.load(res.data)
  const price = $('.intraday__price > .value').text()
  const text = $('.company__name').text()

  if (price !== '') {
    rates.data.push({
      symbol,
      price,
      text: text.replace('Eurodollar 3 Month ', '')
    })
  }

  if (COUNT < EOF) {
    COUNT++
    return await getRatesFromURL()
  } else {
    COUNT = 0
    return rates
  }
}

export async function getRates(symbol) {
  const fileName = 'json/' + symbol + '.json'
  const currentDate = new Date().toLocaleDateString()
  let rates = await getRatesFromFile(fileName)

  // This is not working. after saving a file refreshing the page again will save the file again
  if (rates.date !== currentDate) {
    rates.date = currentDate

    let json = await getFuturesList()
    LIST = json.data.filter((o) => {
      return o.name.match(/\((.+)\)/)[1].startsWith(symbol)
    })

    EOF = LIST.length - 1

    rates = await getRatesFromURL()
    let j = JSON.stringify(rates);

    fs.writeFile(fileName, j, (err) => {
      console.log('writing file')
      if (err) return console.log(err);
      console.log('Data written to file');
    });
  }
  return rates
}
