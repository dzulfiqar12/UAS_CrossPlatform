import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
} from '@ionic/react';
import { useContext } from 'react';

import OrderContext from '../utils/context';

const Cart = () => {
  const { state, dispatch } = useContext(OrderContext);
  const [present, dismiss] = useIonActionSheet();

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

              <IonButton onClick={() => dispatch({ type: 'deleteOrderItem', payload: item.id })}>
                Remove Item
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        <IonGrid className="ion-text-center">
          <IonRow>
            <IonCol>
              <p>
                Price: Rp.{' '}
                {state.items
                  .reduce((previous, current) => previous + current.price * current.quantity, 0)
                  .toLocaleString('id')}
              </p>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton expand="block" disabled={state.items.length === 0}>
                Order
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton
                color="danger"
                expand="block"
                disabled={state.items.length === 0}
                onClick={() =>
                  present({
                    buttons: [
                      {
                        text: 'OK',
                        role: 'destructive',
                        handler: () => dispatch({ type: 'deleteOrderItems', payload: null }),
                      },
                      { text: 'Cancel', role: 'cancel', handler: () => dismiss() },
                    ],
                    header: 'Are you sure you want to reset your orders?',
                  })
                }
              >
                Reset
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Cart;
