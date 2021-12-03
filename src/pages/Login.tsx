import { IonButton, IonContent, IonInput, IonPage, useIonToast } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';

import { login } from '../firebase/auth';
import routes from '../utils/routes';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [present] = useIonToast();
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="login_form">
          <div className="login_form__header">
            <h1>Administrator Panel</h1>

            <p className="login_form_header__subtitle">
              Log in to the service by providing your details below.
            </p>
          </div>

          <p>Username</p>
          <IonInput
            name="email"
            type="text"
            placeholder="Your username..."
            color="black"
            value={email}
            onIonChange={({ detail: { value } }) => setEmail(value!)}
          />

          <p>Password</p>
          <IonInput
            name="password"
            type="password"
            placeholder="Your password..."
            color="black"
            value={password}
            onIonChange={({ detail: { value } }) => setPassword(value!)}
          />

          <IonButton
            shape="round"
            fill="solid"
            className="login_button"
            disabled={email === '' || password === ''}
            onClick={() => {
              login(email, password)
                .then(() => present('Sign in successful!', 500))
                .then(() => history.replace(routes.admin))
                .catch((err) => present(err.message, 1000));
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
