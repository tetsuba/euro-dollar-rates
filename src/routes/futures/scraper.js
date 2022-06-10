import axios from 'axios'
import cheerio from 'cheerio'
import PATHS from '../../utils/paths.js'
import { ScraperError } from '../../errors/errors.js';

const URL = PATHS.URL.BASE + PATHS.URL.FUTURES

async function getPage(url) {
  try {
    const res = await axios.get(url)
    return cheerio.load(res.data)
  } catch (e) {
    throw new ScraperError('Page not found.', e)
  }
}

export async function scrapePaginationLastPageNumber() {
  const $ = await getPage(URL + '1')
  const numOfPages = $('.pagination > li > a').text()

  if (numOfPages === '') throw new ScraperError('Pagination number not found')

  return numOfPages.split('-')
    .reverse()[0]
    .match(/\d+/)[0]
}

export async function scrapeFuturesTableRows(count) {
  const $ = await getPage(URL + count)
  const tableRows = $('.table-condensed > tbody > tr')

  if (tableRows.length === 0) throw new ScraperError('Table not found')

  return tableRows
    .map(function () {
      return {
        name: $(this).find('td > a').text(),
        link: $(this).find('td > a').attr('href'),
        exchange: $($(this).find('td')[1]).text(),
        country: $($(this).find('td')[2]).text(),
      }
    }).toArray()
}