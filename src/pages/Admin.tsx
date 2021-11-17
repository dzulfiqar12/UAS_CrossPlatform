import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';

import AllMenu from '../components/Admin/AllMenu';
import HistoryTransactions from '../components/Admin/HistoryTransactions';
import InProgressTransactions from '../components/Admin/InProgressTransactions';
import { logout } from '../firebase/auth';
import routes from '../utils/routes';

const Admin = () => {
  const [category, setCategory] = useState(
    'In Progress' as 'In Progress' | 'Transactions' | 'Menu'
  );
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

          <IonButtons slot="end">
            <IonButton slot="icon-only" onClick={signOut}>
              <IonText>Logout</IonText>
            </IonButton>
          </IonButtons>

          <IonTitle>Admin</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonSegment
          value={category}
          onIonChange={({ detail: { value } }: CustomEvent) => setCategory(value)}
        >
          <IonSegmentButton value="In Progress">
            <IonLabel>Progress</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="Transactions">
            <IonLabel>Transactions</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="Menu">
            <IonLabel>Menu</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {(() => {
          if (category === 'In Progress') {
            return <InProgressTransactions />;
          }

          if (category === 'Transactions') {
            return <HistoryTransactions />;
          }

          return <AllMenu />;
        })()}
      </IonContent>
    </IonPage>
  );
};

export default Admin;
