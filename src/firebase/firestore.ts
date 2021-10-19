import { collection, Firestore, getDocs, orderBy, query } from 'firebase/firestore';

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
  } catch (err) {
    throw FirestoreError;
  }

  return allMenu;
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
  } catch (err) {
    throw FirestoreError;
  }

  return allTransactions;
};
