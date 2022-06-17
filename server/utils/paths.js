import { resolve } from 'path';

const TEST_ENV = !!process.env.NODE_ENV

const LIST = TEST_ENV ? '/__tests__/mocks/list.json' : '/json/list.json'

export default {
  FILE: {
    FUTURES: {
      LIST: resolve('server/routes/futures' + LIST),
      SYMBOL: resolve('server/routes/futures/json/{symbol}.json')
    }
  },
  URL: {
    BASE: 'https://www.marketwatch.com',
    FUTURES: '/tools/markets/futures/'
  }
}
