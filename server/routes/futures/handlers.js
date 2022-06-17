/* Get futures list from marketwatch
 *
 * URL: https://www.marketwatch.com/tools/markets/futures/{index}
 *
 *  */
import { deleteFile, readJsonFile, saveJsonFile } from '../../utils/utils.js'
import { scrapeFuturePages, scrapeFuturesList } from './scraper.js'
import PATHS from '../../utils/paths.js'

export async function getFuturesListHandler(req, res, next) {
  try {
    let json = await readJsonFile(PATHS.FILE.FUTURES.LIST, undefined)
    if (!json) {
      json = await scrapeFuturesList()
      await saveJsonFile(PATHS.FILE.FUTURES.LIST, json)
    }
    res.json(json)
  } catch(e) {
    next(e)
  }
}

export async function deleteFuturesListHandler(req, res, next) {
  try {
    const message = await deleteFile(PATHS.FILE.FUTURES.LIST)
    res.json(message)
  } catch (e) {
    next(e)
  }
}

export async function updateFuturesListHandler(req, res, next) {
  try {
    const json = await scrapeFuturesList()
    await saveJsonFile(PATHS.FILE.FUTURES.LIST, json)
    res.json(json)
  } catch (e) {
    next(e)
  }
}

export async function getFutureHandler(req, res, next) {
  const { symbol } = req.params
  const futureFilePath = PATHS.FILE.FUTURES.SYMBOL.replace('{symbol}', req.params.symbol)
  try {
    let json = await readJsonFile(futureFilePath, undefined)
    if (!json) {
      const futures = await readJsonFile(PATHS.FILE.FUTURES.LIST, undefined)
      const list = futures.list.filter(({name}) => name.startsWith(symbol.toUpperCase()))
      json = await scrapeFuturePages(list)
      await saveJsonFile(futureFilePath, json)
    }
    res.json(json)
  } catch(e) {
    next(e)
  }
}



