import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBdI2BzH6MnpTKotv1jHm7lFTQY8RbRdXM",
  authDomain: "tasks-app-42e42.firebaseapp.com",
  projectId: "tasks-app-42e42",
  storageBucket: "tasks-app-42e42.appspot.com",
  messagingSenderId: "984032702726",
  appId: "1:984032702726:web:0c40082753debddbdb2e87"
}

// Initialize Firebase
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const projectFirestore = firebase.firestore()

export { projectFirestore }