import '../styles/Login.css';

import { IonButton, IonContent, IonInput, IonPage } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';

import { login } from '../firebase/auth';
import routes from '../utils/routes';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const signIn = async () => {
    login(email, password)
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

          <IonButton shape="round" fill="solid" className="login_button" onClick={signIn}>
            Login
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
