import '../styles/Cart.css';

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
  useIonToast,
} from '@ionic/react';
import { useContext } from 'react';
import { useHistory } from 'react-router';

import { createTransaction } from '../firebase/firestore';
import OrderContext from '../utils/context';
import createOrderFromContext from '../utils/createOrderFromContext';
import routes from '../utils/routes';

const Cart = () => {
  const { state, dispatch } = useContext(OrderContext);
  const history = useHistory();
  const [present, dismiss] = useIonActionSheet();
  const [presentToast] = useIonToast();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg">
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
                <IonButton
                  color="medium"
                  onClick={() =>
                    dispatch({
                      type: 'setOrderItemQuantity',
                      payload: {
                        id: item.id,
                        newQuantity: item.quantity + 1,
                      },
                    })
                  }
                >
                  +
                </IonButton>

                <IonButton
                  color="medium"
                  onClick={() => {
                    if (item.quantity - 1 === 0) {
                      return;
                    }

                    dispatch({
                      type: 'setOrderItemQuantity',
                      payload: {
                        id: item.id,
                        newQuantity: item.quantity - 1,
                      },
                    });
                  }}
                >
                  -
                </IonButton>

                <h4>Price: {item.price * item.quantity}</h4>
              </IonLabel>

              <IonButton
                color="danger"
                onClick={() => dispatch({ type: 'deleteOrderItem', payload: item.id })}
              >
                Remove Item
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        <IonGrid className="ion-text-center">
          <IonRow className="cart">
            <IonCol className="colomn">
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
              <IonButton
                color="success"
                expand="block"
                disabled={state.items.length === 0}
                onClick={() => {
                  const newOrder = createOrderFromContext(state);
                  createTransaction(newOrder)
                    .then(() => {
                      presentToast('You have ordered a new item!', 500);
                      dispatch({ type: 'deleteOrderItems', payload: null });
                      history.replace(routes.home);
                    })
                    .catch((err) => presentToast(err, 1000));
                }}
              >
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
