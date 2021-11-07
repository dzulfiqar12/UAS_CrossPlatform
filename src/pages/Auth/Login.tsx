import './css/login.css';

import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useRef, useState } from 'react';

import { auth } from '../../firebase/auth';

const Logins = () => {
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const login = async () => {
    const enteredEmail = emailRef.current!.value as string;
    const enteredPasswrod = passwordRef.current!.value as string;
    const completeEmail = `${enteredEmail}@ayam-bebek-pak-boss.com`;
    try {
      const user = await signInWithEmailAndPassword(auth, completeEmail, enteredPasswrod);
      console.log(user);
    } catch (error) {
      let errorMessage = 'Failed to do something exceptional';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(errorMessage);
    }
  };
  return (
    <IonPage>
      <IonContent fullscreen className="content">
        <div className="elipse"></div>
        <div className="login_form">
          <IonInput name="email" type="text" placeholder="username" ref={emailRef}></IonInput>
          <IonInput
            name="password"
            type="password"
            placeholder="password"
            ref={passwordRef}
          ></IonInput>
          <IonButton shape="round" fill="solid" className="login_button" onClick={login}>
            Login
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Logins;
