import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import type Menu from '../types/Menu';
import type Transaction from '../types/Transaction';
import { fetchFirestore } from '.';

/**
 * Global Firestore call.
 */
const db = fetchFirestore();

/**
 * Global error constant, give out generic error.
 */
const FirestoreError = new Error('Firestore has encountered an error. Please try again later.');

/**
 * Gets all menu from the database.
 *
 * @returns All menus from the database
 */
export const getMenu = async () => {
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
 * Creates a new menu.
 *
 * @param menu - New menu to be added
 */
export const createMenu = async (menu: Menu) => {
  try {
    await setDoc(doc(db, 'menu', menu.id), menu);
  } catch {
    throw FirestoreError;
  }
};

/**
 * Updates a single menu based on its ID.
 *
 * @param id - The menu ID
 * @param data - Partial object: 'Menu' object to be used to update a single menu
 * @returns Boolean value of success
 */
export const updateMenu = async (id: string, data: Partial<Menu>) => {
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
 * @param id - An ID of the document to be deleted
 * @returns Boolean value of success
 */
export const deleteMenu = async (id: string) => {
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
 * @param sortDirection - Sort direction
 * @returns All transactions from the database
 */
export const getTransactions = async (sortDirection: 'asc' | 'desc') => {
  const allTransactions: Transaction[] = [];

  try {
    const q = query(collection(db, 'transactions'), orderBy('created', sortDirection));
    const snapshots = await getDocs(q);
    snapshots.forEach((doc) => allTransactions.push(doc.data() as Transaction));
  } catch {
    throw FirestoreError;
  }

  return allTransactions;
};

/**
 * Creates a new transaction.
 *
 * @param newTransaction - New transaction
 */
export const createTransaction = async (newTransaction: Transaction) => {
  try {
    await setDoc(doc(db, 'transactions', newTransaction.id), newTransaction);
  } catch {
    throw FirestoreError;
  }
};

/**
 * Accepts a new transaction.
 *
 * @param transactionId - Transaction ID
 */
export const acceptTransaction = async (transactionId: string) => {
  const ref = doc(db, 'transactions', transactionId);

  try {
    await updateDoc(ref, { status: 'Finished' });
  } catch {
    throw FirestoreError;
  }
};
