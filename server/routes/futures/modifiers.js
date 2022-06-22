
export function modifyFuturesListData(data) {
  return {
    date: new Date().toLocaleDateString(),
    list: data,
  }
}

export function modifyFutureData(data) {
  return {
    savedDate: new Date().toLocaleDateString(),
    name: data[0].name,
    list: data.map((future) => {
      const date = new Date(future.name.slice(-8))
      return {
        symbol: future.symbol,
        name: future.name,
        price: future.price,
        month: date.getMonth() + 1,
        year: date.getFullYear()
      }
    })
  }
}