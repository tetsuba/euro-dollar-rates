import fs from 'fs'
import { readJsonFile, saveJsonFile } from '../utils.js'

jest.mock('fs')

describe('utils', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('readJsonFile()', () => {
        const defaultData = { data: '' }
        const mockData = { name: '', link: '', exchange: '', country: '' }
        const filePath = ''

        test('should return mock data', async () => {
            fs.readFileSync.mockResolvedValueOnce(JSON.stringify(mockData))
            fs.existsSync.mockReturnValueOnce(true)

            await expect(readJsonFile(filePath, defaultData)).resolves.toEqual(
                mockData
            )
        })
        test('should return default data', async () => {
            fs.existsSync.mockReturnValueOnce(false)
            const file = await readJsonFile(filePath, defaultData)

            await expect(readJsonFile(filePath, defaultData)).resolves.toEqual(
                defaultData
            )
        })
        test('should throw an error if reading a file fails', async () => {
            fs.readFileSync.mockRejectedValueOnce()
            fs.existsSync.mockReturnValueOnce(true)
            await expect(readJsonFile(filePath, defaultData)).rejects.toThrow(
                'File System Error: READ'
            )
        })
    })
    describe('saveJsonFile()', () => {
        const mockJson = { name: '' }
        test('should throw an error if writing a file fails', async () => {
            fs.writeFileSync.mockRejectedValueOnce()

            await expect(saveJsonFile('path', mockJson)).rejects.toThrow(
                'File System Error: WRITE'
            )
        })
    })
})
