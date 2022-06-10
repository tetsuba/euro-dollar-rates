/* Get futures list from marketwatch
 *
 * URL: https://www.marketwatch.com/tools/markets/futures/{index}
 *
 *  */
import { deleteFile, readJsonFile, saveJsonFile } from '../../utils/utils.js'
import PATHS from '../../utils/paths.js'
import { scrapeFuturesTableRows, scrapePaginationLastPageNumber } from './scraper.js'

// TODO: Where does this function reside? It is not a handler...
// **************************************************************
async function getFuturesListFromURL() {
  const LPN = await scrapePaginationLastPageNumber()
  const promises = []
  for (let i = 1; i <= LPN; i++) {
    promises.push(scrapeFuturesTableRows(i))
  }

  try {
    const data = await Promise.all(promises);

    return {
      date: new Date().toLocaleDateString(),
      list: data.flat()
    }
  } catch (e) {
    throw e
  }
}
// **************************************************************

export async function getFuturesListHandler(req, res, next) {
  try {
    let json = await readJsonFile(PATHS.FILE.FUTURES.LIST, undefined)
    if (!json) {
      json = await getFuturesListFromURL()
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
    const json = await getFuturesListFromURL()
    await saveJsonFile(PATHS.FILE.FUTURES.LIST, json)
    res.json(json)
  } catch (e) {
    next(e)
  }
}
