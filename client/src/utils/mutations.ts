import {
    FutureLineChartType,
    FutureListType,
    FuturesListType,
    FuturesNameType,
    FutureType,
} from './types'

// ***********************************************
// FUTURES LIST - list of all futures
// ***********************************************

export function mutateFuturesList(list: FuturesListType[]): FuturesNameType[] {
    return list.map(({ name }) => name)
}

export function mutateFuturesListByGroupingNames(
    list: FuturesNameType[]
): FuturesNameType[] {
    const j = list
        .filter((name) => !name.endsWith('00'))
        .map((name) => name.replace(name.slice(-3), ''))

    // A value in the (Set) may only occur once.
    return [...new Set<string>(j)]
}

export function filterFuturesList(list: string[], text: string) {
    return list.filter((name: string) => name.startsWith(text))
}

// ***********************************************
// FUTURE LIST - list of data of a specific future
// ***********************************************
export function mutateFutureList(list: FutureType[]): FutureType[] {
    return list
        .map((future) => ({ ...future, checked: true }))
        .sort((a, b) => a.year - b.year)
}

export function mutateFutureListForLineChart(
    list: FutureType[]
): FutureLineChartType {
    const filtered = list.filter(({ checked }) => checked)
    return {
        prices: filtered.map(({ price }) => price.replace(/,/g, '')),
        labels: filtered.map(({ month, year }) => month + '/' + year),
    }
}

export function mutateFutureStringToObject(future: FutureType): FutureListType {
    const [month, year] = future.name.slice(-8).split(' ')
    return {
        month,
        year,
        price: future.price,
    }
}
