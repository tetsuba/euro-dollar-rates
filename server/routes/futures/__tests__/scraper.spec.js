import axios from "axios"
import { futuresListTemplate } from './mocks/htmlMocks.js'
import { scrapePaginationLastPageNumber, scrapeFuturesTableRows } from '../scraper.js'
import mockFuturesList from './mocks/mockJsonFuturesList.json'

jest.mock("axios")

describe('scraper', () => {

  describe('scrapePaginationLastPageNumber', () => {
    test('will return the last page number', async () => {
      axios.get.mockResolvedValueOnce({ data: futuresListTemplate})
      const NOP = await scrapePaginationLastPageNumber()
      expect(NOP).toEqual('5')
    })
  })

  describe('scrapeFuturesTableRow', () => {
    test('will return a list of futures', async () => {
      axios.get.mockResolvedValueOnce({ data: futuresListTemplate})
      const list = await scrapeFuturesTableRows()
      expect(list).toMatchObject(mockFuturesList.list)
    })
  })
})
