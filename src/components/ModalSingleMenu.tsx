import '../styles/Modal.css';

import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react';
import { Dispatch, SetStateAction, useContext, useState } from 'react';

import { getUser } from '../firebase/auth';
import type Menu from '../types/Menu';
import OrderContext from '../utils/context';
import createItemFromMenu from '../utils/createItemFromMenu';

type Props = {
  menu: Menu;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalSingleMenu = ({ menu, isOpen, setIsOpen }: Props) => {
  const { dispatch } = useContext(OrderContext);
  const [quantity, setQuantity] = useState(1);
  const [present] = useIonToast();
  const user = getUser();

  const addToCart = (item: Menu) => {
    const itemToBeOrdered = createItemFromMenu(item, quantity);

    dispatch({
      type: 'addNewOrderItem',
      payload: itemToBeOrdered,
    });

    setQuantity(1);
    present(`${item.name} (x${quantity}) added to cart!`, 500);
    setIsOpen(false);
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)} swipeToClose={true}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detail Menu</IonTitle>

          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(false)}>Back</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonThumbnail
            className="ion-text-center"
            style={{ marginTop: '10px', height: '40vh', width: '100%', objectFit: 'cover' }}
          >
            <IonImg src={menu.photo} alt={menu.name} style={{ borderRadius: '10px' }} />
          </IonThumbnail>

          <IonCardHeader>
            <IonCardTitle>{menu.name}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <div>
              <p>{menu.description}</p>

              <IonItem>
                <IonLabel position="stacked">Enter quantity below:</IonLabel>
                <IonInput
                  type="number"
                  value={quantity}
                  onIonChange={({ detail: { value } }) => setQuantity(parseInt(value!, 10))}
                />
              </IonItem>

              {user ? null : <IonButton onClick={() => addToCart(menu)}>Add to Cart</IonButton>}
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonModal>
  );
};

export default ModalSingleMenu;
