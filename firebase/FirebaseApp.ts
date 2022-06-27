import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig: FirebaseOptions = require('./firebaseConfig.json');

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const Auth = getAuth(app);
