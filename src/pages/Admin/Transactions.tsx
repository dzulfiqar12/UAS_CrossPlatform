import { IonBadge, IonItem, IonLabel, IonList, IonListHeader, IonTitle } from '@ionic/react';
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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                    {transaction.customerName} ({transaction.tableName})
                  </p>

                  <IonBadge color="success">{transaction.status}</IonBadge>
                </div>

                <h4>ID: {transaction.id}</h4>
                <h5>Rp. {transaction.totalPrice.toLocaleString('id-ID')}</h5>
                <h5>{new Date(transaction.created).toLocaleString('id-ID')}</h5>

                <div style={{ padding: '5px' }}></div>

                <h5>Orders:</h5>
                {transaction.items.map((item, idx) => (
                  <p key={item.id}>
                    {idx + 1}. {item.name} ({item.quantity}x)
                  </p>
                ))}
              </IonLabel>
            </IonItem>
          ))}
      </IonList>
    </AdminLayout>
  );
};

export default HistoryTransactions;
