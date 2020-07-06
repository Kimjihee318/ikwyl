import axios from './middleware/axiosInstance'
// * [ SHS ]
async function getReport(data, callback) {
  let res = await axios('report').post('/', data)
  callback(res ? res.data : {})
}
async function putReport(data) {
  let res = await axios('report').put('/', data)
  if (res) return true
}
async function upReport(data) {
  let res = await axios('upreport').post('/', data)
  if (res) return true
}
async function delReport(id) {
  let res = await axios('report').delete('/', { params: id })
  if (res) return true
}

// * [ USER JOIN SHS ]
async function getJoinedSHS(userInfo, callback) {
  let res = await axios('joinreport').post('/', userInfo)
  callback(res ? res.data : {})
}

export default {
  getReport,
  putReport,
  upReport,
  delReport,
  getJoinedSHS
}
