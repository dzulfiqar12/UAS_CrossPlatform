import { getFirestore } from '@firebase/firestore';
import { getStorage } from '@firebase/storage';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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
