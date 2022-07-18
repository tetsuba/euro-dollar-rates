import axios from 'axios'

const BASE_URL = `${window.location.origin}/api/`
const FUTURE_URL = `${BASE_URL}future/`
const FUTURES_LIST_URL = `${BASE_URL}futures/list`

export async function getFuture(symbol) {
  return await axios.get(FUTURE_URL + symbol)
}

export async function getFuturesList() {
  return await axios.get(FUTURES_LIST_URL)
}