import { InternalServerErrorCode } from './error-codes.js'


export class InternalServerError extends Error {
  constructor(message){
    super(message);
    this.name = 'Internal server error'
    this.statusCode = InternalServerErrorCode // 500
  }
}

export class FileSystemError extends InternalServerError {
  constructor(message){
    super(message);
    this.message = 'File System Error: ' + message
  }
}

export class ScraperError extends InternalServerError {
  constructor(message){
    super(message);
    this.message = 'Scraper Error: ' + message
  }
}

