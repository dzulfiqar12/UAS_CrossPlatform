import {
  IonBackButton,
  IonButtons,
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
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>

          <IonTitle>Cart</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          <IonListHeader>
            <IonTitle>Orders</IonTitle>
          </IonListHeader>

          {state.items.map((item) => (
            <IonItem key={item.id}>
              <IonLabel>
                <h2>Name: {item.name}</h2>
                <h3>Quantity: {item.quantity}</h3>
                <h4>Price: {item.price * item.quantity}</h4>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonItem lines="none">
          <p>
            Price: Rp.{' '}
            {state.items
              .reduce((previous, current) => previous + current.price * current.quantity, 0)
              .toLocaleString('id')}
          </p>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Cart;
