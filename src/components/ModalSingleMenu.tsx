import '../styles/Modal.css';

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonModal,
  IonToolbar,
} from '@ionic/react';
import { Dispatch, SetStateAction } from 'react';

import type Menu from '../types/Menu';

type Props = {
  menu: Menu;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalSingleMenu = ({ menu, isOpen, setIsOpen }: Props) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)} swipeToClose={true}>
      <IonHeader>
        <IonToolbar>
          <h1>Detail Menu</h1>

          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(false)}>Back</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonItem>
          <p>
            <IonImg className="gambar-1" src={menu.photo} />
          </p>

          <h2 className="judul-menu">{menu.name}</h2>
          <h3 className="ket-menu1">{menu.description}</h3>
          <p className="ket-menu">{menu.price}</p>

          <IonButton shape="round" className="button-cart">
            Add to Cart
          </IonButton>
        </IonItem>
      </IonContent>
    </IonModal>
  );
};

export default ModalSingleMenu;
