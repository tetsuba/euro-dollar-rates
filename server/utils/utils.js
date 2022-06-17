import fs from 'fs'
import { FileSystemError } from '../errors/errors.js'

export async function readJsonFile(fileName, defaultData) {
    if (fs.existsSync(fileName)) {
        try {
            const data = await fs.readFileSync(fileName)
            return JSON.parse(data)
        } catch (e) {
            throw new FileSystemError('READ', e)
        }
    } else {
        return defaultData
    }
}

export async function saveJsonFile(fileName, json) {
    const text = JSON.stringify(json)
    try {
        await fs.writeFileSync(fileName, text)
    } catch (e) {
        throw new FileSystemError('WRITE', e)
    }
}

export async function deleteFile(fileName) {
    if (fs.existsSync(fileName)) {
        try {
            await fs.unlinkSync(fileName)
            return { message: 'file deleted' }
        } catch (e) {
            throw new FileSystemError('DELETE', e)
        }
    }
    return { message: 'file not found' }
}
