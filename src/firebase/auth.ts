import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { fetchAuth } from '.';

/**
 * Global authentication call, let this be coupled.
 */
const auth = fetchAuth();

/**
 * Global error constant, give out generic error.
 */
const AuthError = new Error('Firebase Auth has encountered an error. Please try again later.');

/**
 * Logs in a user.
 *
 * @param username - Username that is inputted
 * @param password - A user's password
 * @param dispatch - Setter to modify the context
 */
export const login = async (username: string, password: string) => {
  const completeEmail = `${username}@ayam-bebek-pak-boss.com`;

  try {
    await signInWithEmailAndPassword(auth, completeEmail, password);
  } catch {
    throw AuthError;
  }
};

/**
 * Logs out a user.
 */
export const logout = async () => {
  try {
    await signOut(auth);
  } catch {
    throw AuthError;
  }
};

/**
 * Gets the current user.
 *
 */
export const getUser = () => auth.currentUser;
