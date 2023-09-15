
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {

  apiKey: "AIzaSyDf4BqorYyFjChRvu6jjGJRpeq4-Syl3qY",

  authDomain: "netflix-clone-99a85.firebaseapp.com",

  projectId: "netflix-clone-99a85",

  storageBucket: "netflix-clone-99a85.appspot.com",

  messagingSenderId: "282138414318",

  appId: "1:282138414318:web:1377cc61add8491e1f77ff",

  measurementId: "G-DY5ZN7661Z"

};

const app = initializeApp(firebaseConfig);

export const firebaseAuth =getAuth(app);