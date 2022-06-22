

export function convertFutureStringToObject(future) {
  const [month, year] = future.name.slice(-8).split(' ')
  return {
    month,
    year,
    price: future.price
  }
}