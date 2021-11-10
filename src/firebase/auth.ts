import { Auth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

/**
 * Global error constant, give out generic error.
 */
const AuthError = new Error('Firebase Auth has encountered an error. Please try again later.');

/**
 * Logs in a user.
 *
 * @param auth - Firebase authentication service
 * @param username - Username that is inputted
 * @param password - A user's password
 * @param dispatch - Setter to modify the context
 */
export const login = async (auth: Auth, username: string, password: string) => {
  const completeEmail = `${username}@ayam-bebek-pak-boss.com`;

  try {
    await signInWithEmailAndPassword(auth, completeEmail, password);
  } catch {
    throw AuthError;
  }
};

/**
 * Logs out a user.
 *
 * @param auth - Firebase authentication service
 */
export const logout = async (auth: Auth) => {
  try {
    await signOut(auth);
  } catch {
    throw AuthError;
  }
};

/**
 * Gets the current user.
 *
 * @param auth - Firebase authentication service
 */
export const getUser = async (auth: Auth) => auth.currentUser;
