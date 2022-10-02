import axios from 'axios'

const BASE_URL = `${window.location.origin}/api/`
const FUTURE_URL = `${BASE_URL}future/`
const FUTURES_LIST_URL = `${BASE_URL}futures/list`

export const GET_FUTURES = 'getFuture'
export const GET_FUTURES_LIST = 'getFuturesList'

const Service = {
    [GET_FUTURES]: async (symbol) => await axios.get(FUTURE_URL + symbol),
    [GET_FUTURES_LIST]: async () => await axios.get(FUTURES_LIST_URL),
}

export default Service
