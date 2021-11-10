import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';

import { fetchAuth } from '../firebase';
import { logout } from '../firebase/auth';
import routes from '../utils/routes';

const Admin = () => {
  const history = useHistory();

  const signOut = () => {
    logout(fetchAuth())
      .then(() => console.log('Logged out successfully!'))
      .then(() => history.replace(routes.home))
      .catch((err) => console.error(err));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Admin</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <p>Admin Ganteng</p>

        <IonButton onClick={signOut}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Admin;
