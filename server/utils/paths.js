import { resolve } from 'path'

export default {
    FILE: {
        FUTURES: {
            LIST: resolve('routes/futures/json/list.json'),
            SYMBOL: resolve('routes/futures/json/{symbol}.json'),
        },
    },
    URL: {
        BASE: 'https://www.marketwatch.com',
        FUTURES: '/tools/markets/futures/',
    },
}
