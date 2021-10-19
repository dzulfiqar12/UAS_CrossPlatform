import { getFirestore } from '@firebase/firestore';
import { initializeApp } from 'firebase/app';

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
export const fetchFirestore = () => {
  const app = initializeFirebaseApp();
  return getFirestore(app);
};
