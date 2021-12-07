import {
  IonBadge,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonTitle,
  useIonAlert,
  useIonToast,
} from '@ionic/react';
import { checkmarkSharp, closeSharp } from 'ionicons/icons';
import { useCallback, useEffect, useState } from 'react';

import AdminLayout from '../../components/Admin/AdminLayout';
import { acceptTransaction, denyTransaction, getTransactions } from '../../firebase/firestore';
import type Transaction from '../../types/Transaction';

const InProgressTransactions = () => {
  const [transactions, setTransactions] = useState([] as Transaction[]);
  const [presentToast] = useIonToast();
  const [presentAlert] = useIonAlert();

  const fetchTransactionsInApp = useCallback(() => {
    getTransactions('asc')
      .then((res) => setTransactions(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    getTransactions('asc')
      .then((res) => setTransactions(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <AdminLayout>
      <IonList>
        <IonListHeader>
          <IonTitle>In-Progress Transactions</IonTitle>
        </IonListHeader>

        {transactions
          .filter((x) => x.status === 'In Progress')
          .map((transaction) => (
            <IonItem key={transaction.id}>
              <IonLabel>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                    {transaction.customerName} ({transaction.tableName})
                  </p>

                  <IonBadge>{transaction.status}</IonBadge>
                </div>

                <h4>Rp. {transaction.totalPrice.toLocaleString('id-ID')}</h4>
                <h5>{new Date(transaction.created).toLocaleString('id-ID')}</h5>

                <div style={{ padding: '5px' }}></div>

                <h5>Ordered items:</h5>
                {transaction.items.map((item, idx) => (
                  <p key={item.id}>
                    {idx + 1}. {item.name} ({item.quantity}x)
                  </p>
                ))}

                <IonButton
                  color="success"
                  onClick={() => {
                    presentAlert({
                      header: 'Warning!',
                      subHeader: 'This action cannot be reversed.',
                      message: 'Are you sure to finish this order?',
                      buttons: [
                        { text: 'Cancel', role: 'cancel' },
                        {
                          text: 'Finish',
                          role: 'accept',
                          handler: () => {
                            acceptTransaction(transaction.id)
                              .then(() => presentToast('Order has been finished!', 500))
                              .then(() => fetchTransactionsInApp())
                              .catch((err) => presentToast(err, 500));
                          },
                        },
                      ],
                    });
                  }}
                >
                  <IonIcon icon={checkmarkSharp} slot="start" />
                  Finish
                </IonButton>

                <div style={{ marginLeft: '5px', display: 'inline-block' }}></div>

                <IonButton
                  color="danger"
                  onClick={() => {
                    presentAlert({
                      header: 'Warning!',
                      subHeader: 'This action cannot be reversed.',
                      message: 'Are you sure to deny this order?',
                      buttons: [
                        { text: 'Cancel', role: 'cancel' },
                        {
                          text: 'Deny',
                          role: 'destructive',
                          handler: () => {
                            denyTransaction(transaction.id)
                              .then(() => presentToast('Order has been denied!', 500))
                              .then(() => fetchTransactionsInApp())
                              .catch((err) => presentToast(err, 500));
                          },
                        },
                      ],
                    });
                  }}
                >
                  <IonIcon slot="start" icon={closeSharp} />
                  Deny
                </IonButton>
              </IonLabel>
            </IonItem>
          ))}
      </IonList>
    </AdminLayout>
  );
};

export default InProgressTransactions;
