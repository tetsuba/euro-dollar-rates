import axios from 'axios'
const DEFAULT_PORT = 3001
const PORT = process.env.PORT || process.env.REACT_APP_PORT || DEFAULT_PORT
const BASE_URL = `http://localhost:${PORT}/api/`
const FUTURE_URL = `${BASE_URL}future/`
const FUTURES_LIST_URL = `${BASE_URL}futures/list`

export async function getFuture(symbol) {
  return await axios.get(FUTURE_URL + symbol)
}

export async function getFuturesList() {
  return await axios.get(FUTURES_LIST_URL)
}