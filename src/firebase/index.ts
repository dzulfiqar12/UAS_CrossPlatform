import { getFirestore } from '@firebase/firestore';
import { initializeApp } from 'firebase/app';

/**
 * Initializes a Firebase instance.
 *
 * @returns FirebaseApp
 */
const initializeFirebaseApp = () =>
  initializeApp({
    apiKey: 'AIzaSyA9eG5TPih1c8L2MNyBDcbXnv3ba8kwmWE',
    authDomain: 'ayam-bebek-pak-boss-dev.firebaseapp.com',
    projectId: 'ayam-bebek-pak-boss-dev',
    storageBucket: 'ayam-bebek-pak-boss-dev.appspot.com',
    messagingSenderId: '568795540694',
    appId: '1:568795540694:web:0c874957391aa4b768ad77',
  });

/**
 * Creates a single Firestore instance based on the default settings.
 *
 * @returns Firestore instance
 */
export const fetchFirestore = () => {
  const app = initializeFirebaseApp();
  return getFirestore(app);
};
