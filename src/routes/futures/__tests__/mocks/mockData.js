import { buildFuturesListTemplate } from './htmlMocks.js';


export const mockFuturesList = [
  {
    url: 'https://www.marketwatch.com/tools/markets/futures/1',
    template: buildFuturesListTemplate(['22', '23', '24', '25', '26'], ['1', '2-3', '4-5'])
  },
  {
    url: 'https://www.marketwatch.com/tools/markets/futures/1',
    template: buildFuturesListTemplate(['22', '23', '24', '25', '26'], [])
  },
  {
    url: 'https://www.marketwatch.com/tools/markets/futures/2',
    template: buildFuturesListTemplate(['22', '23', '24', '25', '26'], [])
  },
  {
    url: 'https://www.marketwatch.com/tools/markets/futures/3',
    template: buildFuturesListTemplate(['22', '23', '24', '25', '26'], [])
  },
  {
    url: 'https://www.marketwatch.com/tools/markets/futures/4',
    template: buildFuturesListTemplate(['22', '23', '24', '25', '26'], [])
  },
  {
    url: 'https://www.marketwatch.com/tools/markets/futures/5',
    template: buildFuturesListTemplate(['22', '23', '24', '25', '26'], [])
  }
]