import axios from "axios"
import fs from 'fs'
import request from 'supertest'
import app from '../../index.js'
import { buildFuturesListTemplate } from './mocks/htmlMocks.js'
import { InternalServerErrorCode } from '../../../errors/error-codes.js'
import { mockFutureEDList, mockFuturesList } from './mocks/mockData.js'
import mockJsonFuturesList from './mocks/mockJsonFuturesList.json'
import mockJsonFutureED from './mocks/mockJsonFutureED.json'

jest.mock("axios")
jest.mock('fs')

describe('api/futures', () => {
  beforeEach(()  => {
    jest.clearAllMocks()
  })
  describe('/api/futures/list', () => {
    const expectedKeys = ['link', 'name'].sort()

    describe('#SUCCESS', () => {
      test('responds with json data, scraped from external website', (done) => {
        mockFuturesList.forEach(({template}) => axios.get.mockResolvedValueOnce({ data: template}))

        request(app)
          .get('/api/futures/list')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(res => {
            expect(res.body.list).toHaveLength(25)
            expect(Object.keys(res.body.list[0]).sort()).toEqual(expectedKeys)
            mockFuturesList.forEach(({url}) => expect(axios.get).toHaveBeenCalledWith(url))
            done()
          })
          .catch(err => done(err))
      })
      test('responds with json data, read from file',(done) => {
        fs.existsSync.mockReturnValueOnce(true)
        fs.readFileSync.mockResolvedValueOnce(JSON.stringify(mockJsonFuturesList))

        request(app)
          .get('/api/futures/list')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(res => {
            expect(res.body.list).toHaveLength(5)
            expect(Object.keys(res.body.list[0]).sort()).toEqual(expectedKeys)
            mockFuturesList.forEach(({url}) => expect(axios.get).not.toHaveBeenCalledWith(url))
            done();
          })
          .catch(err => done(err))
      })
    })
    describe('#ERROR', () => {
      test('Internal server error: Reading a file failed.',(done) => {
        fs.readFileSync.mockRejectedValueOnce('READ')
        fs.existsSync.mockReturnValueOnce(true)

        request(app)
          .get('/api/futures/list')
          .expect('Content-Type', /json/)
          .expect(InternalServerErrorCode)
          .then(res => {
            expect(res.body.name).toEqual('Internal server error')
            expect(res.body.message).toEqual('File System Error: READ')
            done();
          })
          .catch(err => done(err))
      })
      test('Internal server error: Saving/writing a file failed.',(done) => {
        mockFuturesList.forEach(({template}) => axios.get.mockResolvedValueOnce({ data: template}))
        fs.existsSync.mockReturnValueOnce(false)
        fs.writeFileSync.mockRejectedValueOnce('WRITE')


        request(app)
          .get('/api/futures/list')
          .expect('Content-Type', /json/)
          .expect(InternalServerErrorCode)
          .then(res => {
            expect(res.body.name).toEqual('Internal server error')
            expect(res.body.message).toEqual('File System Error: WRITE')
            done();
          })
          .catch(err => done(err))
      })
      test('Internal server error: Page not found',(done) => {
        axios.get.mockRejectedValueOnce('Page not found.')
        fs.existsSync.mockReturnValueOnce(false)

        request(app)
          .get('/api/futures/list')
          .expect('Content-Type', /json/)
          .expect(InternalServerErrorCode)
          .then(res => {
            expect(res.body.name).toEqual('Internal server error')
            expect(res.body.message).toEqual('Scraper Error: Page not found.')
            done();
          })
          .catch(err => done(err))
      })
      test('Internal server error: Pagination number not found',(done) => {
        fs.existsSync.mockReturnValueOnce(false)
        axios.get.mockResolvedValueOnce({ data: buildFuturesListTemplate([], [])})

        request(app)
          .get('/api/futures/list')
          .expect('Content-Type', /json/)
          .expect(InternalServerErrorCode)
          .then(res => {
            expect(res.body.name).toEqual('Internal server error')
            expect(res.body.message).toEqual('Scraper Error: Pagination number not found')
            done();
          })
          .catch(err => done(err))
      })
      test('Internal server error: Table not found',(done) => {
        fs.existsSync.mockReturnValueOnce(false)
        axios.get.mockResolvedValueOnce({ data: buildFuturesListTemplate([], ['1'])})
        axios.get.mockResolvedValueOnce({ data: buildFuturesListTemplate([], [])})

        request(app)
          .get('/api/futures/list')
          .expect('Content-Type', /json/)
          .expect(InternalServerErrorCode)
          .then(res => {
            expect(res.body.name).toEqual('Internal server error')
            expect(res.body.message).toEqual('Scraper Error: Table not found')
            done();
          })
          .catch(err => done(err))
      })
    })
  })
  describe('/api/futures/list/delete', () => {
    describe('#SUCCESS', () => {
      test('responds with a message "file deleted"', (done) => {
        fs.existsSync.mockReturnValueOnce(true)
        fs.unlinkSync.mockResolvedValueOnce()

        request(app)
          .get('/api/futures/list/delete')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(res => {
            expect(res.body.message).toEqual('file deleted')
            done()
          })
          .catch(err => done(err))
      })
      test('responds with a message "file not found"', (done) => {
        fs.existsSync.mockReturnValueOnce(false)

        request(app)
          .get('/api/futures/list/delete')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(res => {
            expect(res.body.message).toEqual('file not found')
            done()
          })
          .catch(err => done(err))
      })
    })
    describe('#ERROR', () => {
      test('Internal server error: Deleting a file failed.',(done) => {
        fs.existsSync.mockReturnValueOnce(true)
        fs.unlinkSync.mockRejectedValueOnce('DELETE')

        request(app)
          .get('/api/futures/list/delete')
          .expect('Content-Type', /json/)
          .expect(InternalServerErrorCode)
          .then(res => {
            expect(res.body.name).toEqual('Internal server error')
            expect(res.body.message).toEqual('File System Error: DELETE')
            done();
          })
          .catch(err => done(err))
      })
    })
  })
  describe('/api/futures/list/update', () => {
    describe('#SUCCESS', () => {
      test('responds with an updated futures list and today/s date', (done) => {
        mockFuturesList.forEach(({template}) => axios.get.mockResolvedValueOnce({ data: template}))

        request(app)
          .get('/api/futures/list/update')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(res => {
            expect(res.body.date).toEqual(new Date().toLocaleDateString())
            done();
          })
          .catch(err => done(err))
      })
    })
    describe('#ERROR', () => {
      test('Internal server error: Saving/writing a file failed.',(done) => {
        mockFuturesList.forEach(({template}) => axios.get.mockResolvedValueOnce({ data: template}))
        fs.existsSync.mockReturnValueOnce(false)
        fs.writeFileSync.mockRejectedValueOnce('WRITE')

        request(app)
          .get('/api/futures/list/update')
          .expect('Content-Type', /json/)
          .expect(InternalServerErrorCode)
          .then(res => {
            expect(res.body.name).toEqual('Internal server error')
            expect(res.body.message).toEqual('File System Error: WRITE')
            done();
          })
          .catch(err => done(err))
      })
      test('Internal server error: Page not found',(done) => {
        axios.get.mockRejectedValueOnce('Page not found.')
        fs.existsSync.mockReturnValueOnce(false)

        request(app)
          .get('/api/futures/list/update')
          .expect('Content-Type', /json/)
          .expect(InternalServerErrorCode)
          .then(res => {
            expect(res.body.name).toEqual('Internal server error')
            expect(res.body.message).toEqual('Scraper Error: Page not found.')
            done();
          })
          .catch(err => done(err))
      })
      test('Internal server error: Pagination number not found',(done) => {
        fs.existsSync.mockReturnValueOnce(false)
        axios.get.mockResolvedValueOnce({ data: buildFuturesListTemplate([], [])})

        request(app)
          .get('/api/futures/list/update')
          .expect('Content-Type', /json/)
          .expect(InternalServerErrorCode)
          .then(res => {
            expect(res.body.name).toEqual('Internal server error')
            expect(res.body.message).toEqual('Scraper Error: Pagination number not found')
            done();
          })
          .catch(err => done(err))
      })
      test('Internal server error: Table not found',(done) => {
        fs.existsSync.mockReturnValueOnce(false)
        axios.get.mockResolvedValueOnce({ data: buildFuturesListTemplate([], ['1'])})
        axios.get.mockResolvedValueOnce({ data: buildFuturesListTemplate([], [])})

        request(app)
          .get('/api/futures/list/update')
          .expect('Content-Type', /json/)
          .expect(InternalServerErrorCode)
          .then(res => {
            expect(res.body.name).toEqual('Internal server error')
            expect(res.body.message).toEqual('Scraper Error: Table not found')
            done();
          })
          .catch(err => done(err))
      })
    })


  })
  describe('/api/future/{symbol}', () => {
    const expectedKeys = ['link', 'name', 'price', 'symbol'].sort()

    describe('#SUCCESS', () => {
      test('responds with json data, filtered by symbol', (done) => {
        fs.existsSync.mockReturnValueOnce(false)
        fs.existsSync.mockReturnValueOnce(true)
        fs.readFileSync.mockResolvedValueOnce(JSON.stringify(mockJsonFuturesList))
        mockFutureEDList.forEach(({template}) => axios.get.mockResolvedValueOnce({ data: template}))

        request(app)
          .get('/api/future/ED')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(res => {
            expect(res.body.list).toHaveLength(5)
            expect(Object.keys(res.body.list[0]).sort()).toEqual(expectedKeys)
            mockFutureEDList.forEach(({url}) => expect(axios.get).toHaveBeenCalledWith(url))
            done()
          })
          .catch(err => done(err))
      })
      test('responds with saved json data', (done) => {
        fs.existsSync.mockReturnValueOnce(true)
        fs.readFileSync.mockResolvedValueOnce(JSON.stringify(mockJsonFutureED))

        request(app)
          .get('/api/future/ED')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(res => {
            expect(res.body.list).toHaveLength(5)
            expect(Object.keys(res.body.list[0]).sort()).toEqual(expectedKeys)
            done()
          })
          .catch(err => done(err))
      })
    })
    // Note: these errors are the same as "/api/futures/list"
    describe('#ERROR', () => {})
  })
})
