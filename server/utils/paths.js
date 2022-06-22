import { resolve } from 'path'

export default {
    FILE: {
        FUTURES: {
            LIST: resolve('server/routes/futures/json/list.json'),
            SYMBOL: resolve('server/routes/futures/json/{symbol}.json'),
        },
    },
    URL: {
        BASE: 'https://www.marketwatch.com',
        FUTURES: '/tools/markets/futures/',
    },
}
