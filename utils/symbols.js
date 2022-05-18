// Euro Dollar - ed

const months = [
  {
    name: 'january',
    key: ''
  },
  {
    name: 'february',
    key: ''
  },
  {
    name: 'march',
    key: 'h'
  },
  {
    name: 'april',
    key: ''
  },
  {
    name: 'may',
    key: ''
  },
  {
    name: 'june',
    key: 'm'
  },
  {
    name: 'july',
    key: ''
  },
  {
    name: 'august',
    key: ''
  },
  {
    name: 'september',
    key: 'u'
  },
  {
    name: 'october',
    key: ''
  },
  {
    name: 'november',
    key: ''
  },
  {
    name: 'december',
    key: 'z'
  },
]

const month = new Date().toLocaleString('default', { month: 'long' }).toLowerCase()
const i = months.findIndex(({name}) => name === month)

// const monthlyCode = [...months.splice(i), ...months.splice(0, i)]
//   .filter(({key}) => key)
//   .reduce((pre,cur) => {
//     pre.push(cur.key)
//     return pre
//   }, [])

// console.log(monthlyCode)


// MONTH:
// h = MARCH
// m = JUNE
// u = SEPTEMBER
// z = DECEMBER

const year = new Date().getFullYear().toString().slice(-2)


console.log('month', month)

function getIndex(i) {
  const EOF = 4
  if (i < EOF) {
    return i
  } else {
    return i % EOF
  }
}

const t = ['h', 'm', 'u', 'z']

const symbols = Array(10).fill([])
  .map((a, index) => {
    const y = Number(year) + index

    return a.concat(t).map((code) => `ed${code}${y}`)

    // .map(() => 'ed')
    // return s + monthlyCode[getIndex(index)] + y
  }).flat()


// 10 years from today
// YEAR - 22, 23, 24, 25



export default symbols