import axios from 'axios'
import {
    buildFuturesListTemplate,
    buildFutureTemplate,
} from './mocks/htmlMocks.js'
import {
    scrapePaginationLastPageNumber,
    scrapeFuturesTableRows,
    scrapeFuturePage,
    scrapeFuturesList,
    scrapeFuturePages,
} from '../scraper.js'
import mockFuturesList from './mocks/mockJsonFuturesList.json'

jest.mock('axios')

describe('scraper', () => {
    const htmlTemplate = buildFuturesListTemplate(
        ['22', '23', '24', '25', '26'],
        ['1', '2-3', '4-5']
    )

    describe('scrapePaginationLastPageNumber()', () => {
        test('will return the last page number', async () => {
            axios.get.mockResolvedValueOnce({ data: htmlTemplate })
            const NOP = await scrapePaginationLastPageNumber()
            expect(NOP).toEqual(5)
        })
    })

    describe('scrapeFuturesTableRow()', () => {
        test('will return a list of futures', async () => {
            axios.get.mockResolvedValueOnce({ data: htmlTemplate })
            const list = await scrapeFuturesTableRows()
            expect(list).toMatchObject(mockFuturesList.list)
        })
    })

    describe('scrapeFuturePage()', () => {
        test('will return page data', async () => {
            const future = {
                name: 'EuroDollar 3 Moths',
                price: '80',
                symbol: 'EDM22',
                link: 'http:example.com/futures',
            }
            axios.get.mockResolvedValueOnce({
                data: buildFutureTemplate(future.name, future.price),
            })
            const list = await scrapeFuturePage({
                name: future.symbol,
                link: future.link,
            })
            expect(list).toMatchObject(future)
        })
    })

    describe('scrapeFuturesList()', () => {
        test('will return a list of futures', async () => {
            axios.get.mockResolvedValue({ data: htmlTemplate })
            const list = await scrapeFuturesList()
            expect(list).toHaveLength(25)
        })
    })

    describe('scrapeFuturePages()', () => {
        test('will return a list of a specified future', async () => {
            const future = {
                name: 'EuroDollar 3 Moths',
                price: '80',
                symbol: 'EDM22',
                link: 'http:example.com/futures',
            }
            Array(mockFuturesList.list.length)
                .fill(future)
                .forEach(({ name, price }) =>
                    axios.get.mockResolvedValueOnce({
                        data: buildFutureTemplate(name, price),
                    })
                )
            const list = await scrapeFuturePages(mockFuturesList.list)
            expect(list).toHaveLength(5)
        })

        test('will return an error', async () => {
            axios.get.mockResolvedValueOnce()
            await expect(
                scrapeFuturePages(mockFuturesList.list)
            ).rejects.toThrow('Scraper Error: Page not found.')
        })
    })
})
