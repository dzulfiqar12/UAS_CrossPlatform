import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react';
import { useHistory } from 'react-router';

import { getUser, logout } from '../firebase/auth';
import routes from '../utils/routes';

const Admin = () => {
  const [present] = useIonToast();
  const history = useHistory();

  const signOut = () => {
    logout()
      .then(() => present('Logged out successfully!', 500))
      .then(() => history.replace(routes.home))
      .catch((err) => console.error(err));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>

          <IonTitle>Admin</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p>Admin Ganteng</p>
        <p>Current user: {JSON.stringify(getUser())}</p>

        <IonButton onClick={signOut}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Admin;
