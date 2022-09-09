

export function mutateFutureList(list) {
  return list
    .map((future) => ({ ...future, checked: true}))
    .sort((a, b) => a.year - b.year)
}

export function mutateFutureListForLineChart(list) {
  const filtered = list.filter(({checked}) => checked) // .slice(8)
  return {
    prices: filtered.map(({price}) => price.replace(/,/g, '')),
    labels: filtered.map(({month, year}) => month + '/' + year)
  }
}