import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyApWsbPBhhsTXyXpopijAFdbujNfdtvgPs",
  authDomain: "estudos-14ccc.firebaseapp.com",
  projectId: "estudos-14ccc",
  storageBucket: "estudos-14ccc.firebasestorage.app",
  messagingSenderId: "909409362553",
  appId: "1:909409362553:web:96950ee74ecc5e35b46aa8"
};



const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

export {auth,db}