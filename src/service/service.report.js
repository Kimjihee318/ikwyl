import axios from './middleware/axiosInstance'
// import __C from '@/primitives/_constants_'

async function getReport(data, callback) {
  let res = await axios('report').post('/', data)
  callback(res ? res.data : {})
}
async function putReport(data) {
  await axios('report').put('/', data)
}
async function upReport(data) {
  await axios('report').post('/', data)
}
async function delReport(id) {
  await axios('report').delete('/', { params: { id: id } })
}

export default {
  getReport,
  putReport,
  upReport,
  delReport
}
