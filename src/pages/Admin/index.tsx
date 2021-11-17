import { IonButton } from '@ionic/react';

import AdminLayout from '../../components/Admin/AdminLayout';
import { getUser } from '../../firebase/auth';
import routes from '../../utils/routes';

const Admin = () => (
  <AdminLayout>
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p>Welcome, {getUser()?.email?.split('@')[0]}!</p>
      <IonButton style={{ width: '250px' }} routerLink={routes.adminOngoing}>
        In Progress Transactions
      </IonButton>

      <IonButton style={{ width: '250px' }} routerLink={routes.adminHistory}>
        All Transactions
      </IonButton>

      <IonButton style={{ width: '250px' }} routerLink={routes.adminMenu}>
        Menu Management
      </IonButton>
    </section>
  </AdminLayout>
);

export default Admin;
