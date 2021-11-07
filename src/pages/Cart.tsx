import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useContext } from 'react';

import OrderContext from '../utils/context';

const Cart = () => {
  const { state } = useContext(OrderContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cart</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          <IonListHeader>
            <IonTitle>Menu</IonTitle>
          </IonListHeader>

          {state.items.map((item) => (
            <IonItem key={item.id}>
              <IonLabel>
                <h2>{item.name}</h2>
                <h3>{item.quantity}</h3>
                <p>{item.price}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Cart;
