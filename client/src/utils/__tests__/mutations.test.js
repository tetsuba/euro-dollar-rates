import {
    mutateFuturesList,
    mutateFutureList,
    mutateFutureListForLineChart,
    mutateFuturesListByGroupingNames,
    mutateFutureStringToObject,
} from '../mutations'

describe('mutations', () => {
    describe('Future(s)List', () => {
        describe('mutateFuturesList()', () => {
            test('should return a text list of names', () => {
                const mockList = [
                    { name: 'EDT2903', link: 'http://mock-lick.com' },
                    { name: 'EDT2403', link: 'http://mock-lick.com' },
                    { name: 'EDT3003', link: 'http://mock-lick.com' },
                ]

                const expectedList = ['EDT2903', 'EDT2403', 'EDT3003']

                expect(mutateFuturesList(mockList)).toEqual(expectedList)
            })
        })
        describe('mutateFuturesListByGroupingNames()', () => {
            const mockList = [
                'ED2300',
                'SIR00',
                'EDH24',
                'EDM24',
                'EDQ24',
                'OLM22',
            ]
            const expectedList = ['ED', 'OL']

            test('', () => {
                expect(mutateFuturesListByGroupingNames(mockList)).toEqual(
                    expectedList
                )
            })
        })
    })

    describe('FutureList', () => {
        describe('mutateFutureList()', () => {
            test('should return list with a new property and sorted by year', () => {
                const mockList = [
                    { year: 2021, month: '08', price: '1,000,000.50' },
                    { year: 2010, month: '06', price: '100,000' },
                    { year: 1999, month: '02', price: '1,000' },
                    { year: 2000, month: '04', price: '10,000' },
                ]

                const expectedList = [
                    { year: 1999, month: '02', price: '1,000', checked: true },
                    { year: 2000, month: '04', price: '10,000', checked: true },
                    {
                        year: 2010,
                        month: '06',
                        price: '100,000',
                        checked: true,
                    },
                    {
                        year: 2021,
                        month: '08',
                        price: '1,000,000.50',
                        checked: true,
                    },
                ]

                expect(mutateFutureList(mockList)).toEqual(expectedList)
            })
        })
        describe('mutateFutureListForLineChart()', () => {
            const mockList = [
                { year: 1998, month: '02', price: '1,000', checked: true },
                { year: 2000, month: '04', price: '10,000', checked: true },
                { year: 2021, month: '06', price: '100,000', checked: false },
                {
                    year: 2021,
                    month: '08',
                    price: '1,000,000.50',
                    checked: true,
                },
            ]

            const expected = {
                prices: ['1000', '10000', '1000000.50'],
                labels: ['02/1998', '04/2000', '08/2021'],
            }

            const futureList = mutateFutureListForLineChart(mockList)

            test('should return an array of prices and removing any commas from the price', () => {
                expect(futureList.prices).toEqual(expected.prices)
            })
            test('should return an array of labels with month and year combined', () => {
                expect(futureList.labels).toEqual(expected.labels)
            })
            test('should filter out all data that are unchecked', () => {
                const [{ label, price }] = mockList
                    .filter(({ checked }) => !checked)
                    .map(({ month, year, price }) => ({
                        label: month + '/' + year,
                        price: price.replace(/,/g, ''),
                    }))

                expect(futureList.prices).not.toContain(price)
                expect(futureList.labels).not.toContain(label)
            })
        })
        describe('mutateFutureStringToObject()', () => {
            test('should return an object', () => {
                const mockData = {
                    name: 'Eurodollar 3 Month Jun 2029',
                    price: '100',
                }
                const expected = {
                    month: 'Jun',
                    year: '2029',
                    price: '100',
                }
                expect(mutateFutureStringToObject(mockData)).toEqual(expected)
            })
        })
    })
})
