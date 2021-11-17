import { IonItem, IonLabel, IonList, IonListHeader, IonTitle } from '@ionic/react';
import { useEffect, useState } from 'react';

import AdminLayout from '../../components/Admin/AdminLayout';
import { getTransactions } from '../../firebase/firestore';
import type Transaction from '../../types/Transaction';

const HistoryTransactions = () => {
  const [transactions, setTransactions] = useState([] as Transaction[]);

  useEffect(() => {
    getTransactions('desc')
      .then((res) => setTransactions(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <AdminLayout>
      <IonList>
        <IonListHeader>
          <IonTitle>All Transactions</IonTitle>
        </IonListHeader>

        {transactions
          .filter((x) => x.status === 'Finished')
          .map((transaction) => (
            <IonItem key={transaction.id}>
              <IonLabel>
                <h2>
                  {transaction.customerName} - {transaction.tableName}
                </h2>
                <h3>{transaction.status}</h3>
                <h4>{transaction.totalPrice}</h4>
                <h5>{transaction.created}</h5>

                {transaction.items.map((item) => (
                  <p key={item.name}>{JSON.stringify(item)}</p>
                ))}
              </IonLabel>
            </IonItem>
          ))}
      </IonList>
    </AdminLayout>
  );
};

export default HistoryTransactions;
