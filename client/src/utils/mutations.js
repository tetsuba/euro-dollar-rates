// ***********************************************
// FUTURES LIST - list of all futures
// ***********************************************
export function mutateFuturesList(list) {
    return list.map(({ name }) => name)
}

export function mutateFuturesListByGroupingNames(list) {
    const j = list
        .filter((string) => !string.endsWith('00'))
        .map((string) => string.replace(string.slice(-3), ''))

    // A value in the (Set) may only occur once.
    return [...new Set(j)]
}

// ***********************************************
// FUTURE LIST - list of data of a specific future
// ***********************************************
export function mutateFutureList(list) {
    return list
        .map((future) => ({ ...future, checked: true }))
        .sort((a, b) => a.year - b.year)
}

export function mutateFutureListForLineChart(list) {
    const filtered = list.filter(({ checked }) => checked)
    return {
        prices: filtered.map(({ price }) => price.replace(/,/g, '')),
        labels: filtered.map(({ month, year }) => month + '/' + year),
    }
}

export function mutateFutureStringToObject(future) {
    const [month, year] = future.name.slice(-8).split(' ')
    return {
        month,
        year,
        price: future.price,
    }
}
