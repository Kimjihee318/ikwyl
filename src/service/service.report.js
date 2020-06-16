import axios from './middleware/axiosInstance'
// * [ SHS ]
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

// * [ USER JOIN SHS ]
async function getJoinedReport(callback) {
  let res = await axios('report').get('/')
  callback(res ? res.data : {})
}

export default {
  getReport,
  putReport,
  upReport,
  delReport,
  getJoinedReport
}
