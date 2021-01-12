//firebase => authentication, firestore
//importing firebase and auth module
import firebase from 'firebase'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD6Keg2jJl512lryJisLIjK-akaWAqkmkQ",
  authDomain: "bookmarker-ba651.firebaseapp.com",
  projectId: "bookmarker-ba651",
  storageBucket: "bookmarker-ba651.appspot.com",
  messagingSenderId: "244398994620",
  appId: "1:244398994620:web:2b1d09c2626b038b9d0cb9"
};
const app=firebase.initializeApp(firebaseConfig)
export const googleProvider=new firebase.auth.GoogleAuthProvider()
export const auth=app.auth()
export const firestore=app.firestore()
