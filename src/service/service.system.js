import axios from './middleware/axiosInstance'
// * [ SHS ]
async function getSHS(callback) {
  let res = await axios('system').post('/')
  callback(res ? res.data : {})
}
async function putSHS(data) {
  await axios('system').put('/', data)
}
async function upSHS(data) {
  await axios('system').post('/', data)
}
async function delSHS(id) {
  await axios('system').delete('/', { params: { id: id } })
}

// * [ LIST SHS ]
async function addSHSList(data) {
  await axios('systemlist').put('/', data)
}

// * [ USER INFO ]
async function getUserInfo(callback) {
  let res = await axios('systemusi').post('/')
  callback(res ? res.data : {})
}
async function putUserInfo(data) {
  await axios('systemusi').put('/', data)
}
async function upUserInfo(data) {
  await axios('systemusi').post('/', data)
}
async function delUserInfo(id) {
  await axios('systemusi').delete('/', { params: { id: id } })
}

export default {
  getSHS,
  putSHS,
  upSHS,
  delSHS,
  addSHSList,
  getUserInfo,
  putUserInfo,
  upUserInfo,
  delUserInfo
}
