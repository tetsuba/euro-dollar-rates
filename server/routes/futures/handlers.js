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


async function getFuturesRatesFromURL() {}

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

function filterFuturesList(json, characters) {
  return {
    ...json,
    list: json.list
      .map((obj) => ({
        ...obj,
        name: obj.name.match(/\((.+)\)/)[1]
      }))
      .filter(({name}) => name.startsWith(characters.toUpperCase()))
  }
}
// **************************************************************

export async function getFuturesListHandler(req, res, next) {
  const characters = req.query.filter || ''

  try {
    let json = await readJsonFile(PATHS.FILE.FUTURES.LIST, undefined)
    if (!json) {
      json = await getFuturesListFromURL()
      await saveJsonFile(PATHS.FILE.FUTURES.LIST, json)
    }
    res.json(filterFuturesList(json, characters))
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

export async function getFutureGroupsHandler(req, res, next) {
  const symbol = req.query.filter || ''

  try {
    let json = await readJsonFile(PATHS.FILE.FUTURES.LIST, undefined)
    const j = json.list
      .map(({name}) => name.match(/\((.+)\)/)[1])
      .filter((string) => !string.endsWith('00'))
      .map((string) => string.replace(string.slice(-3), ''))

    const s = [...new Set(j)]
      .map((id) => {
          return id.length > 1 && {
            [id]: json.list
              .filter(({name}) => name.startsWith(id))
              .map(({link}) => link)
          }
      })

    res.json(s)

  } catch(e) {
    next(e)
  }
}

// how to group codes and output detailed info

export async function getFutureRatesHandler(req, res, next) {
  const symbol = req.query.symbol || ''

  try {
    let json = await readJsonFile(PATHS.FILE.FUTURES.SYMBOL + symbol + '.json', undefined)
    if (!json) {
      json = await getFuturesRatesFromURL()
      await saveJsonFile(PATHS.FILE.FUTURES.SYMBOL + symbol + '.json', json)
    }
    res.json(filterFuturesList(json, characters))
  } catch(e) {
    next(e)
  }
}



