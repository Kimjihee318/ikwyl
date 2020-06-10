import __C from '@/primitives/_constants_'
import FirebaseOAuth from '@/service/firebase/firebase.google.oauth'

async function setAccount2LocalStorage(callback) {
  let OAuth = new FirebaseOAuth()
  await OAuth.googleAuth((token, user) => {
    let account = {
      token: token,
      user: user
    }
    localStorage.setItem(__C.LOCAL_STORAGE_NAME.ACCOUNT, JSON.stringify(account))
    callback(token, user)
  })
}
export default { setAccount2LocalStorage }
