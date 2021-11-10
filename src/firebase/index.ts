import { getFirestore } from '@firebase/firestore';
import { getStorage } from '@firebase/storage';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import firebaseConfig from './config';

/**
 * Initializes a Firebase instance.
 *
 * @returns FirebaseApp
 */
const initializeFirebaseApp = () => initializeApp(firebaseConfig);

/**
 * Creates a single Firestore instance based on the default settings.
 *
 * @returns Firestore instance
 */
export const fetchFirestore = () => getFirestore(initializeFirebaseApp());

/**
 * Creates a single Cloud Storage instance based on the default settings.
 *
 * @returns Cloud Storage instance
 */
export const fetchStorage = () => getStorage(initializeFirebaseApp());

/**
 * Creates a single Authentication instance based on the default settings.
 *
 * @returns Authentication instance
 */
export const fetchAuth = () => getAuth(initializeFirebaseApp());

/**
 * Single listener to listen to the authentication observable.
 */
onAuthStateChanged(fetchAuth(), (user) => {
  if (user) {
    console.log('User is logged in with the following details:');
    console.log(user);
  } else {
    console.log('User has been signed out.');
  }
});
