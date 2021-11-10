import '../styles/Login.css';

import { IonButton, IonContent, IonInput, IonPage } from '@ionic/react';
import { useRef } from 'react';
import { useHistory } from 'react-router';

import { login } from '../firebase/auth';
import routes from '../utils/routes';

const Logins = () => {
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const history = useHistory();

  const signIn = async () => {
    const enteredEmail = emailRef.current!.value as string;
    const enteredPassword = passwordRef.current!.value as string;

    login(enteredEmail, enteredPassword)
      .then(() => console.log('Login success!'))
      .then(() => history.replace(routes.home))
      .catch((err) => console.error(err));
  };

  return (
    <IonPage>
      <IonContent fullscreen className="content">
        <div className="elipse"></div>
        <div className="login_form">
          <IonInput
            name="email"
            type="text"
            placeholder="username"
            ref={emailRef}
            color="light"
          ></IonInput>

          <IonInput
            name="password"
            type="password"
            placeholder="password"
            ref={passwordRef}
            color="light"
          ></IonInput>

          <IonButton shape="round" fill="solid" className="login_button" onClick={signIn}>
            Login
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Logins;
