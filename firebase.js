import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAIaBsefiU2N5Ho6CVL6Js40vy3DQ_2RWI",
    authDomain: "multi-2297.firebaseapp.com",
    projectId: "multi-2297",
    storageBucket: "multi-2297.appspot.com",
    messagingSenderId: "434662447831",
    appId: "1:434662447831:web:6f8fd2f0e3af6f4fbbee92"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
