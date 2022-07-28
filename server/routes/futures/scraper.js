import axios from 'axios'
import cheerio from 'cheerio'
import PATHS from '../../utils/paths.js'
import { ScraperError } from '../../errors/errors.js'

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

    return ~~numOfPages.split('-').reverse()[0].match(/\d+/)[0]
}

export async function scrapeFuturesTableRows(count) {
    const $ = await getPage(URL + count)
    const tableRows = $('.table-condensed > tbody > tr')

    if (tableRows.length === 0) throw new ScraperError('Table not found')

    return tableRows
        .map(function () {
            const name = $(this)
                .find('td > a')
                .text()
                .match(/\((.+)\)/)[1]
            return {
                name,
                link: $(this).find('td > a').attr('href'),
            }
        })
        .toArray()
}

export async function scrapeFuturePage({ link, name }) {
    const $ = await getPage(PATHS.URL.BASE + link)
    return {
        symbol: name,
        name: $('.company__name').text(),
        price: $('.intraday__price > .value').text(),
        link,
    }
}

export async function scrapeFuturesList() {
    try {
        const lastPage = await scrapePaginationLastPageNumber()
        const promises = Array(lastPage)
            .fill(0)
            .map((_, i) => i + 1)
            .map(scrapeFuturesTableRows)
        const list = await Promise.all(promises)
        return list.flat()
    } catch (e) {
        throw e
    }
}

export async function scrapeFuturePages(list) {
    try {
        const promises = list.map(scrapeFuturePage)
        return await Promise.all(promises)
    } catch (e) {
        throw e
    }
}
