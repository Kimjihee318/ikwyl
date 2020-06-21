import * as d3 from 'd3'

function isSelectedDate() {
  // let today = new Date()
  // return (
  //   date.getFullYear() === today.getFullYear() &&
  //   date.getMonth() === today.getMonth() &&
  //   date.getDate() === today.getDate()
  // )
}

function expressionCheckToday(date) {
  let today = new Date()
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
}

function filterDatesByCurrentWeek(arr, prop) {
  if (!arr || arr.length === 0) return
  let [start, end] = getWeekDates()
  return arr.filter(d => +new Date(d[prop]) >= +start && +new Date(d[prop]) < +end)
}

function getKeyofDateType(arr, dates) {
  let selected = []
  Object.keys(arr).forEach(d => {
    dates.forEach(_d => {
      if (
        new Date(d).getFullYear() === _d.getFullYear() &&
        new Date(d).getMonth() === _d.getMonth() &&
        new Date(d).getDate() === _d.getDate()
      )
        selected.push(arr[_d])
    })
  })

  return selected
}
function getWeekDates() {
  let now = new Date()
  let dayOfWeek = now.getDay() //0-6
  let numDay = now.getDate()

  let start = new Date(now) //copy
  start.setDate(numDay - dayOfWeek)
  start.setHours(0, 0, 0, 0)

  let end = new Date(now) //copy
  end.setDate(numDay + (7 - dayOfWeek))
  end.setHours(0, 0, 0, 0)

  return [start, end]
}

function mean(arr) {
  if (!arr || arr.length === 0) return

  return (
    arr.reduce((c, v) => {
      return c + v
    }, 0) / arr.length
  )
}

function meanTime(arr) {
  if (!arr || arr.length === 0) return

  return new Date(
    arr.reduce((c, v) => {
      return c + v.getTime()
    }, 0) / arr.length
  )
}

function nested() {
  // ? THIS IS REFERENCE
  let arr = [
    { company: 'Google', country: 'USA', employee: 'John' },
    { company: 'Amazon', country: 'UK', employee: 'Arya' },
    { company: 'Google', country: 'KSA', employee: 'Cersi' },
    { company: 'Amazon', country: 'USA', employee: 'Tyrion' },
    { company: 'Amazon', country: 'USA', employee: 'Daenarys' },
    { company: 'Google', country: 'KSA', employee: 'Dothrokhi' }
  ]

  let result = arr.reduce((c, v) => {
    c[v.company] = c[v.company] || {} //Init if company property does not exist
    c[v.company][v.country] = c[v.company][v.country] || {} //Init if country property does not exist
    c[v.company][v.country][v.employee] = null //Add employee property with null value
    return c
  }, {})

  return result
}

function onlyUnique(arr) {
  return arr.filter((v, i, a) => a.indexOf(v) === i)
}

function onlyUniqueObjectInArray(arr) {
  const uniq = new Set(arr.map(d => JSON.stringify(d)))
  return Array.from(uniq).map(d => JSON.parse(d))
}

function propertyMean(arr, prop) {
  if (!arr || arr.length === 0) return
  return (
    arr.reduce((c, v) => {
      return c + v[prop]
    }, 0) / arr.length
  )
}

function obj2Lowercase(obj) {
  if (obj instanceof Array) {
    return obj.map(d => {
      if (typeof d === 'object') {
        d = obj2Lowercase(d)
      }
      return d
    })
  }
  let key
  let keys = Object.keys(obj)
  let newobj = {}
  Object.keys(obj).forEach((d, i) => {
    key = keys[i]
    newobj[key.toLowerCase()] = obj[key]
  })
  return newobj
}

function timeFormat(format, time) {
  // * format || typeof String || example '%Y년 %m월 %d일 %H:%M %p'
  return d3.timeFormat(format)(time)
}

function toCamel(o) {
  var newO, origKey, newKey, value
  if (o instanceof Array) {
    return o.map(function(value) {
      if (typeof value === 'object') {
        value = toCamel(value)
      }
      return value
    })
  } else {
    newO = {}
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        // (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString()
        value = o[origKey]
        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = toCamel(value)
        }
        newO[newKey] = value
      }
    }
  }
  return newO
}

export default {
  isSelectedDate,
  expressionCheckToday,
  filterDatesByCurrentWeek,
  getKeyofDateType,
  getWeekDates,
  mean,
  meanTime,
  onlyUnique,
  onlyUniqueObjectInArray,
  propertyMean,
  obj2Lowercase,
  timeFormat,
  toCamel,
  nested
}
