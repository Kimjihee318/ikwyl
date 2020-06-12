import axios from './middleware/axiosInstance'
import __C from '@/primitives/_constants_'
import FirebaseOAuth from '@/service/firebase/firebase.google.oauth'
let OAuth = new FirebaseOAuth()

async function getUserInfo(user, callback) {
  let res = await axios('getuserinfo').post('/', user)
  callback(res ? res.data : {})
}
async function delAccount2LocalStorage(callback) {
  await OAuth.logoutGoogleAuth(isLogout => {
    if (isLogout) localStorage.removeItem(__C.LOCAL_STORAGE_NAME.ACCOUNT)
    let isEmptyLocalStorage = !localStorage.getItem(__C.LOCAL_STORAGE_NAME.ACCOUNT) ? true : false
    callback({ isEmptyLocalStorage: isEmptyLocalStorage })
  })
}
async function setAccount2LocalStorage(callback) {
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
async function postUserInfo(userdata, callback) {
  try {
    let res = await axios('userinfo').post('/', userdata)
    if (callback) callback(res.data ? res.data : {})
  } catch (err) {
    console.log('[AXIOS ERROR]', err)
  }
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

export default { delAccount2LocalStorage, getUserInfo, setAccount2LocalStorage, postUserInfo, addUserInfo }
