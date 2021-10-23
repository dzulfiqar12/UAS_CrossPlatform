import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';

import type Menu from '../types/Menu';
import type Transaction from '../types/Transaction';

/**
 * Global error constant, give out generic error.
 */
const FirestoreError = new Error('Firestore has encountered an error. Please try again later.');

/**
 * Gets all menu from the database.
 *
 * @param db - Firestore instance
 * @returns All menus from the database
 */
export const getMenu = async (db: Firestore) => {
  const allMenu: Menu[] = [];

  try {
    const q = query(collection(db, 'menu'), orderBy('name'));
    const snapshots = await getDocs(q);
    snapshots.forEach((doc) => allMenu.push(doc.data() as Menu));
  } catch {
    throw FirestoreError;
  }

  return allMenu;
};

/**
 * Updates a single menu based on its ID.
 *
 * @param db - Firestore instance
 * @param id - The menu ID
 * @param data - Partial object: 'Menu' object to be used to update a single menu
 * @returns Boolean value of success
 */
export const updateMenu = async (db: Firestore, id: string, data: Partial<Menu>) => {
  const ref = doc(db, 'menu', id);

  try {
    await updateDoc(ref, data);
  } catch {
    throw FirestoreError;
  }

  return true;
};

/**
 * Deletes a single menu based on its ID.
 *
 * @param db - Firestore instance
 * @param id - An ID of the document to be deleted
 * @returns Boolean value of success
 */
export const deleteMenu = async (db: Firestore, id: string) => {
  const ref = doc(db, 'menu', id);

  try {
    await deleteDoc(ref);
  } catch {
    throw FirestoreError;
  }

  return true;
};

/**
 * Gets all transactions from the database.
 *
 * @param db - Firestore instance
 * @returns All transactions from the database
 */
export const getTransactions = async (db: Firestore) => {
  const allTransactions: Transaction[] = [];

  try {
    const q = query(collection(db, 'transactions'), orderBy('created'));
    const snapshots = await getDocs(q);
    snapshots.forEach((doc) => allTransactions.push(doc.data() as Transaction));
  } catch {
    throw FirestoreError;
  }

  return allTransactions;
};
