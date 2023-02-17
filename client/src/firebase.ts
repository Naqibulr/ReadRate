// Import the functions you need from the SDKs you need
//@ts-ignore
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD9tgJKrbFxo7v91e_vV0k6Oe0yeR9MPwc',
  authDomain: 'bokimdb.firebaseapp.com',
  projectId: 'bokimdb',
  storageBucket: 'bokimdb.appspot.com',
  messagingSenderId: '430886205496',
  appId: '1:430886205496:web:9c0a0f3e1f0f74768e4ecd',
  measurementId: 'G-JWPWJH1R8S',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
