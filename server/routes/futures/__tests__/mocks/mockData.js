import { buildFuturesListTemplate, buildFutureTemplate } from './htmlMocks.js'

export const mockFuturesList = [
    {
        url: 'https://www.marketwatch.com/tools/markets/futures/1',
        template: buildFuturesListTemplate(
            ['22', '23', '24', '25', '26'],
            ['1', '2-3', '4-5']
        ),
    },
    {
        url: 'https://www.marketwatch.com/tools/markets/futures/1',
        template: buildFuturesListTemplate(['22', '23', '24', '25', '26'], []),
    },
    {
        url: 'https://www.marketwatch.com/tools/markets/futures/2',
        template: buildFuturesListTemplate(['22', '23', '24', '25', '26'], []),
    },
    {
        url: 'https://www.marketwatch.com/tools/markets/futures/3',
        template: buildFuturesListTemplate(['22', '23', '24', '25', '26'], []),
    },
    {
        url: 'https://www.marketwatch.com/tools/markets/futures/4',
        template: buildFuturesListTemplate(['22', '23', '24', '25', '26'], []),
    },
    {
        url: 'https://www.marketwatch.com/tools/markets/futures/5',
        template: buildFuturesListTemplate(['22', '23', '24', '25', '26'], []),
    },
]

export const mockFutureEDList = [
    {
        url: 'https://www.marketwatch.com/investing/future/EDM22',
        template: buildFutureTemplate('Euro Dollar 3 Month June 2022', 90),
    },
    {
        url: 'https://www.marketwatch.com/investing/future/EDM23',
        template: buildFutureTemplate('Euro Dollar 3 Month June 2023', 91),
    },
    {
        url: 'https://www.marketwatch.com/investing/future/EDM24',
        template: buildFutureTemplate('Euro Dollar 3 Month June 2024', 92),
    },
    {
        url: 'https://www.marketwatch.com/investing/future/EDM25',
        template: buildFutureTemplate('Euro Dollar 3 Month June 2025', 93),
    },
    {
        url: 'https://www.marketwatch.com/investing/future/EDM26',
        template: buildFutureTemplate('Euro Dollar 3 Month June 2026', 94),
    },
]
