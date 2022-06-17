import { ClientErrorCode, InternalServerErrorCode } from './error-codes.js'

// ***********************************************************
// 400 errors

export class ClientError extends Error {
    constructor(message) {
        super(message)
        this.name = 'Client error'
        this.statusCode = ClientErrorCode // 400
    }
}

export class ParamError extends ClientError {
    constructor(message) {
        super(message)
        this.message = `Missing parameter "${message}"`
    }
}

// ***********************************************************
// 500 errors

export class InternalServerError extends Error {
    constructor(message) {
        super(message)
        this.name = 'Internal server error'
        this.statusCode = InternalServerErrorCode
    }
}

export class FileSystemError extends InternalServerError {
    constructor(message) {
        super(message)
        this.message = 'File System Error: ' + message
    }
}

export class ScraperError extends InternalServerError {
    constructor(message) {
        super(message)
        this.message = 'Scraper Error: ' + message
    }
}
