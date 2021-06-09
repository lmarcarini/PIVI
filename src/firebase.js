import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAF0dAVgWAD5-BTE3Jcp1jRbh42SBq63tM",
    authDomain: "pivi-315719.firebaseapp.com",
    projectId: "pivi-315719",
    storageBucket: "pivi-315719.appspot.com",
    messagingSenderId: "1060291214882",
    appId: "1:1060291214882:web:d9cdb94e695bedfd3b547b",
    measurementId: "G-WNZ24PQQ8S"
};

const app=firebase.initializeApp(firebaseConfig);
  
export const auth=app.auth()
export default app