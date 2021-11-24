import '../../styles/index.css';

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react';
import { ReactNode } from 'react';
import { useHistory } from 'react-router';

import { logout } from '../../firebase/auth';
import routes from '../../utils/routes';

type Props = {
  children: ReactNode;
};

const AdminLayout = ({ children }: Props) => {
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
        <IonToolbar className="contentRed">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>

          <IonButtons slot="end">
            <IonButton slot="icon-only" onClick={signOut}>
              <IonText>Logout</IonText>
            </IonButton>
          </IonButtons>

          <IonTitle>Admin</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">{children}</IonContent>
    </IonPage>
  );
};

export default AdminLayout;
