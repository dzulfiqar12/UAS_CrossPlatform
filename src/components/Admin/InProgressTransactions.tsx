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

import { acceptTransaction, getTransactions } from '../../firebase/firestore';
import type Transaction from '../../types/Transaction';

const InProgressTransactions = () => {
  const [transactions, setTransactions] = useState([] as Transaction[]);
  const [present] = useIonToast();

  const fetchTransactionsInApp = useCallback(() => {
    getTransactions()
      .then((res) => setTransactions(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    getTransactions()
      .then((res) => setTransactions(res))
      .catch((err) => console.error(err));
  }, []);

  return (
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
                <p key={item.name}>{JSON.stringify(item)}</p>
              ))}

              <IonButton
                onClick={() => {
                  acceptTransaction(transaction.id)
                    .then(() => present('Order has been finished!', 500))
                    .then(() => fetchTransactionsInApp())
                    .catch((err) => present(err, 500));
                }}
              >
                Accept
              </IonButton>
            </IonLabel>
          </IonItem>
        ))}
    </IonList>
  );
};

export default InProgressTransactions;