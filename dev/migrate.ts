import { initializeApp } from 'firebase/app';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from 'firebase/firestore';

import firebaseConfig from '../src/firebase/config';
import type Menu from '../src/types/Menu';
import alaCarteMenus from './data/alaCarteMenu';
import goHomeMenus from './data/goHomeMenu';
import packageMenus from './data/packageMenu';

/**
 * Initializes a Firebase instance.
 *
 * @returns FirebaseApp
 */
function setupFirebaseApp() {
  return initializeApp(firebaseConfig);
}

/**
 * Deletes all menu in the database.
 *
 * @param db - Firestore instance
 */
async function deleteMenu(db: Firestore) {
  const q = query(collection(db, 'menu'));
  const snapshots = await getDocs(q);
  snapshots.forEach(async (doc) => await deleteDoc(doc.ref));
}

/**
 * Deletes all transactions in the database.
 *
 * @param db - Firestore instance
 */
async function deleteTransactions(db: Firestore) {
  const q = query(collection(db, 'transactions'));
  const snapshots = await getDocs(q);
  snapshots.forEach(async (doc) => await deleteDoc(doc.ref));
}

/**
 * Inserts all menu to the database.
 *
 * @param menu - All of the menu according to the database schema
 * @param db - Firestore instance
 */
async function insertMenu(menu: Menu[], db: Firestore) {
  await Promise.all(
    menu.map(async (item) => {
      await setDoc(doc(db, 'menu', item.id), item);
    })
  );
}

/**
 * Driver code.
 */
async function main() {
  const menu = [...alaCarteMenus, ...goHomeMenus, ...packageMenus];

  // initialize firebase app and db
  const app = setupFirebaseApp();
  const db = getFirestore(app);

  // delete all data from firebase
  await deleteMenu(db);
  await deleteTransactions(db);

  // insert all menu to firebase
  await insertMenu(menu, db);
}

/**
 * Simulates 'function main()' in most progamming languages.
 */
if (require.main === module) {
  main()
    .then(() => {
      console.log('Inserted data into the database.');
      process.exit();
    })
    .catch((err) => console.error(err));
}
