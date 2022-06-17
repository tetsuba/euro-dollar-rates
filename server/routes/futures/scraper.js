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

    return numOfPages.split('-').reverse()[0].match(/\d+/)[0]
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

async function scrapeFuturePage(link, name) {
    const $ = await getPage(PATHS.URL.BASE + link)

    return {
        symbol: name,
        name: $('.company__name').text(),
        price: $('.intraday__price > .value').text(),
        link,
    }
}

// EXPORTED Functions ----------------------------------------

export async function scrapeFuturesList() {
    const LPN = await scrapePaginationLastPageNumber()
    const promises = []
    for (let i = 1; i <= LPN; i++) {
        promises.push(scrapeFuturesTableRows(i))
    }

    try {
        const data = await Promise.all(promises)

        return {
            date: new Date().toLocaleDateString(),
            list: data.flat(),
        }
    } catch (e) {
        throw e
    }
}

export async function scrapeFuturePages(list) {
    const promises = []
    list.forEach(({ link, name }) => {
        promises.push(scrapeFuturePage(link, name))
    })

    try {
        const data = await Promise.all(promises)
        return {
            date: new Date().toLocaleDateString(),
            list: data,
        }
    } catch (e) {
        throw e
    }
}
