import axios from 'axios'
import {
    mutateFutureList,
    mutateFuturesList,
    mutateFuturesListByGroupingNames,
    mutateFutureStringToObject
} from "./mutations";

const BASE_URL = `${window.location.origin}/api/`
const FUTURE_URL = `${BASE_URL}future/`
const FUTURES_LIST_URL = `${BASE_URL}futures/list`


export const fetchFutures = async () => {
    try {
        const response = await axios.get(FUTURES_LIST_URL)
        const mutatedList = mutateFuturesList(response.data.list)
        return {
            date: response.data.date,
            list: mutatedList,
            group: mutateFuturesListByGroupingNames(mutatedList)
        }

    } catch (e) {
        throw new Error('Futures api error')
    }
}

export const fetchFuture = async ({ queryKey }: any) => {
    try {
        const response = await axios.get(FUTURE_URL + queryKey[1].symbol)
        return {
            list: mutateFutureList(response.data.list),
            year: response.data.list.map(mutateFutureStringToObject)
        }

    } catch(e) {
        throw new Error('Future api error')
    }
}
