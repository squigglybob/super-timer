import app from 'firebase/app'
import  'firebase/auth'
import  'firebase/database'
import  'firebase/firestore'
import 'firebase/functions'

console.log(process.env);

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config)

    app.functions().useFunctionsEmulator('http://localhost:5000')
        
    this.auth = app.auth()
    this.db = app.database()

    this.fsdb = app.firestore()

    this.functions = app.functions()

    // firestore doesn't clear cache between sessions.
    // so any cached data for offline persistance won't be secure.
    app.firestore().enablePersistence()
      .catch((error) => {
        if( error.code === 'failed-precondition' ){
          console.error( '*** : persistance failed precondition ***' );
        } else if( error.code === 'unimplemented' ){
          console.error( '*** : data persistance is unimplemented on this browser' );
        }
      })

    // *** Helpers ***
    this.serverValue = app.database.ServerValue
    this.FieldValue = app.firestore.FieldValue
  }

  serverTimestamp = () =>  this.FieldValue.serverTimestamp()


  //  *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)
    .then(() => console.log( 'Signed In', this.auth ))

  doSignOut = () => {
    this.auth.signOut()
    console.log( 'Signed Out', this.auth );
  }

  doSendPasswordResetEmail = (data) => this.functions.httpsCallable('emailSendPasswordResetEmailOnCall')(data)

  doSendEmailVerification = (data) => this.functions.httpsCallable('emailSendEmailVerificationOnCall')(data)

  //      for currentUser ***
  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password)

  doEmailUpdate = (email) => 
    this.auth.currentUser.updateEmail(email)

  doDeleteCurrentUser = () =>
    this.auth.currentUser.delete()

  //      for any user
  doCreateUser = (user) => this.functions.httpsCallable('httpsCreateUserOnCall')(user)

  // update object can contain properties email | emailVerified |
  // phoneNumber | password | displayName | photoURL | disabled
  doUpdateUser = (uid, update) => this.functions.httpsCallable('httpsUpdateUserOnCall')({ uid, update })

  doDeleteUser = (uid) => this.functions.httpsCallable('httpsDeleteUserOnCall')({ uid })

  doVerifyUser = (uid, user, password, keyRef) => this.functions.httpsCallable('httpsVerifyUserOnCall')({ uid, user, password, keyRef })
  
  // *** Merge Auth and DB User API ***

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(
      (authUser) => {
        if ( authUser ){
          this.user(authUser.uid)
            .once('value')
            .then((snapshot) => {
              const dbUser = snapshot.val()
              // merge authUser and dbUser
              authUser = {
                ...dbUser,
                uid: authUser.uid,
                email: authUser.email,
                emailVerified: authUser.emailVerified,
                providerData: authUser.providerData,
              }

              next(authUser)
            })
        } else {
          fallback(authUser)
        }
      })

  // *** User DB API ***
  // ref has methods .set() .get() .update() .remove()

  user = (uid) => this.db.ref(`users/${uid}`)

  users = () => this.db.ref('users')

  userList = () => this.fsdb.collection('userList')

  userConnections = (uid) => this.db.ref(`users/${uid}/connections`)

  userLastOnline = (uid) => this.db.ref(`users/${uid}/lastOnline`)
  
  userConnected = () => this.db.ref('.info/connected')

}

export default Firebase
