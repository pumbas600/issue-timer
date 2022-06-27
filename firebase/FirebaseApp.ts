import { initializeApp } from 'firebase/app';

interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}

const firebaseConfig: FirebaseConfig = require('./firebaseConfig.json');

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
