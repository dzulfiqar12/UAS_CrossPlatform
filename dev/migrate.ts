import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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
import {
  deleteObject,
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadString,
} from 'firebase/storage';
import { nanoid } from 'nanoid';

import firebaseConfig from '../src/firebase/config';
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
 * Deletes all imges in Cloud Storage.
 *
 * @param storage - Firebase Cloud Storage instance
 */
async function deleteStorage(storage: FirebaseStorage) {
  const results = await listAll(ref(storage, 'menu'));
  results.items.forEach(async (reference) => await deleteObject(reference));
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
 * @param storage - Firebase Storage instance
 */
async function insertMenu(menu: typeof alaCarteMenus, db: Firestore, storage: FirebaseStorage) {
  // insert all images
  const completeMenu = await Promise.all(
    menu.map(async (item) => {
      const menuRef = ref(storage, `menu/${nanoid()}`);
      await uploadString(menuRef, item.photo, 'base64', { contentType: 'image/webp' });

      const photo = await getDownloadURL(menuRef);
      item.photo = photo;
      item.photoRef = menuRef.toString();

      return item;
    })
  );

  // insert all menu
  await Promise.all(completeMenu.map((item) => setDoc(doc(db, 'menu', item.id), item)));
}

/**
 * Driver code.
 */
async function main() {
  const menu = [...alaCarteMenus, ...goHomeMenus, ...packageMenus];

  // initialize firebase app and db
  const app = setupFirebaseApp();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  // login to firebase auth
  await signInWithEmailAndPassword(
    auth,
    `${process.env.USERNAME!}@ayam-bebek-pak-boss.com`,
    process.env.PASSWORD!
  );

  // delete all data from firebase
  await deleteStorage(storage);
  await deleteMenu(db);
  await deleteTransactions(db);

  // insert all menu to firebase
  await insertMenu(menu, db, storage);
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
