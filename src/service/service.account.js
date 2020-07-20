import axios from './middleware/axiosInstance'
import __C from '@/primitives/_constants_'
import FirebaseOAuth from '@/service/firebase/firebase.google.oauth'
let OAuth = new FirebaseOAuth()

//* [ LOGIN / LOGOUT ]
async function delAccount2LocalStorage(callback) {
  await OAuth.logoutGoogleAuth(isLogout => {
    if (isLogout) localStorage.removeItem(__C.LOCAL_STORAGE_NAME.ACCOUNT)
    let isEmptyLocalStorage = !localStorage.getItem(__C.LOCAL_STORAGE_NAME.ACCOUNT) ? true : false
    callback({ isEmptyLocalStorage: isEmptyLocalStorage })
  })
}

async function setAccount2LocalStorage(data, callback) {
  let res = await axios('login').post('/', data)
  let account = {
    token: 'visitor_test',
    user: { email: 'visitor@fts.com', displayName: '방문자' },
    isNewUser: false
  }
  if (res) {
    localStorage.setItem(__C.LOCAL_STORAGE_NAME.ACCOUNT, JSON.stringify(account))
  }
  let getLocalSTAccount = JSON.parse(localStorage.getItem(__C.LOCAL_STORAGE_NAME.ACCOUNT))
  callback(getLocalSTAccount)
}

async function setGoogleAccount2LocalStorage(callback) {
  await OAuth.loginGoogleAuth(({ token, user, isNewUser }) => {
    let account = {
      token: token,
      user: user,
      isNewUser: isNewUser
    }
    localStorage.setItem(__C.LOCAL_STORAGE_NAME.ACCOUNT, JSON.stringify(account))
    let getLocalSTAccount = JSON.parse(localStorage.getItem(__C.LOCAL_STORAGE_NAME.ACCOUNT))
    callback(getLocalSTAccount)
  })
}

//* [ BUILDING ]
async function getBuildingName(callback) {
  let res = await axios('buildingname').get('/')
  callback(res ? res.data : {})
}

async function getBuildingNo(callback) {
  let res = await axios('buildingno').get('/')
  callback(res ? res.data : {})
}

async function addBuildingName(bdNa, callback) {
  let res = await axios('buildingname').put('/', bdNa)
  if (callback) callback(res ? res.data : {})
}

async function addBuildingNo(bdNo, callback) {
  let res = await axios('buildingno').put('/', bdNo)
  if (callback) callback(res ? res.data : {})
}

async function delBuildingName(id, callback) {
  let res = await axios('buildingname').delete('/', { params: { id: id } })
  if (callback) callback(res ? res.data : {})
}

async function delBuildingNo(id, callback) {
  let res = await axios('buildingno').delete('/', { params: { id: id } })
  if (callback) callback(res ? res.data : {})
}

//* [ PERMISSION ]
async function getUserPermission(email, callback) {
  let res = await axios('permission').post('/', email)
  callback(res ? res.data : {})
}

//* [ USER INFO ]
async function getUserInfo(userEmail, callback) {
  let res = await axios('getuserinfo').post('/', userEmail)
  callback(res ? res.data : {})
}
async function addUserInfo(userdata, callback) {
  try {
    //  * axios는 promise여서 await로 받아온다.
    let res = await axios('userinfo').put('/', userdata)
    if (callback) callback(res.data ? res.data : {})
  } catch (err) {
    console.log('[AXIOS ERROR]', err)
  }
}
async function postUserInfo(userdata, callback) {
  try {
    let res = await axios('userinfo').post('/', userdata)
    if (callback) callback(res.data ? res.data : {})
  } catch (err) {
    console.log('[AXIOS ERROR]', err)
  }
}

export default {
  addBuildingName,
  addBuildingNo,
  addUserInfo,
  delAccount2LocalStorage,
  delBuildingName,
  delBuildingNo,
  getUserInfo,
  getBuildingName,
  getBuildingNo,
  getUserPermission,
  postUserInfo,
  setAccount2LocalStorage,
  setGoogleAccount2LocalStorage
}
