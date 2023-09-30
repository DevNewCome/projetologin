import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCNdky15pVRDK8amW-3r3gxULF0jfBAXb8",
    authDomain: "projetologin-6b8a6.firebaseapp.com",
    projectId: "projetologin-6b8a6",
    storageBucket: "projetologin-6b8a6.appspot.com",
    messagingSenderId: "740843286894",
    appId: "1:740843286894:web:c014688afb405b8397117f",
    measurementId: "G-778YTEENWW"
  };

  const fireBaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(fireBaseApp)
  const auth = getAuth(fireBaseApp)

  export { db, auth };