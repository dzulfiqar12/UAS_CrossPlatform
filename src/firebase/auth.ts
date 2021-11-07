import { initializeApp } from '@firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { Redirect } from 'react-router';

import firebaseConfig from './config';
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(uid);
    // ...
  } else {
    // <Redirect to="/login" />;
  }
});
