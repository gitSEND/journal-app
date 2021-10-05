import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCjP2ynhlR6M5BHenIts1BaqJSjHWTgBIA',
  authDomain: 'react-journal-app-c8448.firebaseapp.com',
  projectId: 'react-journal-app-c8448',
  storageBucket: 'react-journal-app-c8448.appspot.com',
  messagingSenderId: '64547001332',
  appId: '1:64547001332:web:a3fbbf01ce487c67789fa1',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { db, provider, auth };
