import axios from 'axios'
import { buildFuturesListTemplate } from './mocks/htmlMocks.js'
import {
    scrapePaginationLastPageNumber,
    scrapeFuturesTableRows,
} from '../scraper.js'
import mockFuturesList from './mocks/mockJsonFuturesList.json'

jest.mock('axios')

describe('scraper', () => {
    const htmlTemplate = buildFuturesListTemplate(
        ['22', '23', '24', '25', '26'],
        ['1', '2-3', '4-5']
    )

    describe('scrapePaginationLastPageNumber', () => {
        test('will return the last page number', async () => {
            axios.get.mockResolvedValueOnce({ data: htmlTemplate })
            const NOP = await scrapePaginationLastPageNumber()
            expect(NOP).toEqual('5')
        })
    })

    describe('scrapeFuturesTableRow', () => {
        test('will return a list of futures', async () => {
            axios.get.mockResolvedValueOnce({ data: htmlTemplate })
            const list = await scrapeFuturesTableRows()
            expect(list).toMatchObject(mockFuturesList.list)
        })
    })
})
