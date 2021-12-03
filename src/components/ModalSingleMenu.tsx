import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
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
import { cartSharp } from 'ionicons/icons';
import { Dispatch, SetStateAction, useContext, useState } from 'react';

import { getUser } from '../firebase/auth';
import type Menu from '../types/Menu';
import OrderContext from '../utils/context';
import createItemFromMenu from '../utils/createItemFromMenu';

type Props = {
  menu: Menu | null;
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
        {menu && (
          <IonCard>
            <IonThumbnail
              className="ion-text-center"
              style={{ marginTop: '10px', height: '50vh', width: '100%', objectFit: 'cover' }}
            >
              <IonImg src={menu.photo} alt={menu.name} style={{ borderRadius: '10px' }} />
            </IonThumbnail>

            <IonCardHeader>
              <IonCardTitle>
                {menu.name} • {menu.category}
              </IonCardTitle>
              <IonCardSubtitle>Rp. {menu.price.toLocaleString('id-ID')}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <div>
                <p>{menu.description}</p>

                <IonItem className="ion-no-padding">
                  <IonLabel position="floating">Enter desired quantity below:</IonLabel>
                  <IonInput
                    type="number"
                    value={quantity}
                    onIonChange={({ detail: { value } }) => setQuantity(parseInt(value!, 10))}
                  />
                </IonItem>

                {user ? null : (
                  <div style={{ marginTop: '10px' }}>
                    <IonButton size="small" color="success" onClick={() => addToCart(menu)}>
                      <IonIcon slot="start" icon={cartSharp} />
                      Add to Cart
                    </IonButton>
                  </div>
                )}
              </div>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonModal>
  );
};

export default ModalSingleMenu;
