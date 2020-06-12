import firebase from './firebase.init'
// console.log(firebase, `[GOOGLE OAUTH TEST]`)

export default class FirebaseOAuth {
  constructor() {}

  loginGoogleAuth(callback) {
    let provider = new firebase.auth.GoogleAuthProvider()
    // ? TRY TO ASYNC AWAIT
    // try {
    //   let result = firebase.auth().signInWithPopup(provider)
    //   callback(result ? result : [])
    //   console.log(result)
    // } catch (err) {
    //   // Handle Errors here.
    //   let errorCode = err.code
    //   console.log(`[errorCode]`, errorCode)
    //   let errorMessage = err.message
    //   console.log(`[errorMessage]`, errorMessage)
    //   // The email of the user's account used.
    //   let email = err.email
    //   console.log(`[email]`, email)
    //   // The firebase.auth.AuthCredential type that was used.
    //   let credential = err.credential
    //   console.log(`[credential]`, credential)
    //   // ...
    // }

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = result.credential.accessToken
        let user = result.user
        let isNewUser = result.additionalUserInfo.isNewUser

        let formattedResult = {
          token: token,
          user: user,
          isNewUser: isNewUser,
          origin: result
        }
        callback(formattedResult)
      })
      .catch(function(error) {
        console.log(error)
        // Handle Errors here.
        let errorCode = error.code
        console.log(`[errorCode]`, errorCode)
        let errorMessage = error.message
        console.log(`[errorMessage]`, errorMessage)
        // The email of the user's account used.
        let email = error.email
        console.log(`[email]`, email)
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential
        console.log(`[credential]`, credential)
        // ...
      })
  }

  logoutGoogleAuth(callback) {
    firebase
      .auth()
      .signOut()
      .then(function() {
        callback(true)
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
        console.log(`[SIGNOUT_ERROR]`, error)
      })
  }
}
