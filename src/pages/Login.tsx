import '../styles/Login.css';

import { IonButton, IonContent, IonInput, IonPage, useIonToast } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';

import { login } from '../firebase/auth';
import routes from '../utils/routes';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [present] = useIonToast();
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen className="content">
        <div className="elipse"></div>
        <div className="login_form">
          <IonInput
            name="email"
            type="text"
            placeholder="username"
            color="light"
            value={email}
            onIonChange={({ detail: { value } }) => setEmail(value!)}
          />

          <IonInput
            name="password"
            type="password"
            placeholder="password"
            color="light"
            value={password}
            onIonChange={({ detail: { value } }) => setPassword(value!)}
          />

          <IonButton
            shape="round"
            fill="solid"
            className="login_button"
            disabled={isLoggingIn}
            onClick={() => {
              setIsLoggingIn(true);
              login(email, password)
                .then(() => present('Sign in successful!', 500))
                .then(() => history.replace(routes.home))
                .catch((err) => present(err.message, 1000))
                .finally(() => setIsLoggingIn(false));
            }}
          >
            Login
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
