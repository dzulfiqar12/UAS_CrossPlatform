import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonTitle,
  useIonToast,
} from '@ionic/react';
import { useCallback, useEffect, useState } from 'react';

import AdminLayout from '../../components/Admin/AdminLayout';
import { acceptTransaction, denyTransaction, getTransactions } from '../../firebase/firestore';
import type Transaction from '../../types/Transaction';

const InProgressTransactions = () => {
  const [transactions, setTransactions] = useState([] as Transaction[]);
  const [present] = useIonToast();

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
                <h2>
                  {transaction.customerName} - {transaction.tableName}
                </h2>
                <h3>{transaction.status}</h3>
                <h4>{transaction.totalPrice}</h4>

                {transaction.items.map((item) => (
                  <p key={item.id}>{JSON.stringify(item)}</p>
                ))}

                <IonButton
                  onClick={() => {
                    acceptTransaction(transaction.id)
                      .then(() => present('Order has been finished!', 500))
                      .then(() => fetchTransactionsInApp())
                      .catch((err) => present(err, 500));
                  }}
                >
                  Finish
                </IonButton>

                <IonButton
                  onClick={() => {
                    denyTransaction(transaction.id)
                      .then(() => present('Order has been denied!', 500))
                      .then(() => fetchTransactionsInApp())
                      .catch((err) => present(err, 500));
                  }}
                >
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
