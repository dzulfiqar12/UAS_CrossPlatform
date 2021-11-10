import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';

import ModalSingleMenu from '../components/ModalSingleMenu';
import { getUser } from '../firebase/auth';
import { getMenu } from '../firebase/firestore';
import type Menu from '../types/Menu';
import routes from '../utils/routes';

export const Home: React.FC = () => {
  const [category, setCategory] = useState('Ala Carte' as 'Ala Carte' | 'Paket' | 'Go Home');
  const [menu, setMenu] = useState([] as Menu[]);
  const [chosenMenu, setChosenMenu] = useState({} as Menu);
  const [showModal, setShowModal] = useState(false);
  const user = getUser();

  useEffect(() => {
    console.log('Currently logged in user:');
    console.log(user);

    getMenu()
      .then((res) => setMenu(res))
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <>
      <ModalSingleMenu menu={chosenMenu} isOpen={showModal} setIsOpen={setShowModal} />

      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton>Home</IonButton>
            </IonButtons>

            {user && (
              <IonButtons slot="end">
                <IonButton routerLink={routes.admin}>Admin</IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonSegment
            value={category}
            onIonChange={({ detail: { value } }: CustomEvent) => setCategory(value)}
          >
            <IonSegmentButton value="Ala Carte">
              <IonLabel>Ala Carte</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Paket">
              <IonLabel>Paket</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Go Home">
              <IonLabel>Go Home</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          <IonList>
            <IonListHeader>
              <IonTitle>Menu</IonTitle>
            </IonListHeader>

            {menu
              .filter((item) => item.category === category)
              .map((item) => (
                <IonItem
                  onClick={() => {
                    setChosenMenu(item);
                    setShowModal(true);
                  }}
                  key={item.id}
                >
                  <IonAvatar slot="start">
                    <IonImg src={item.photo} alt={`Avatar of ${item.name}`} />
                  </IonAvatar>

                  <IonLabel>
                    <h2>{item.name}</h2>
                    <h3>{item.category}</h3>
                    <p>{item.description}</p>
                  </IonLabel>

                  <IonButton
                    onClick={() => {
                      setChosenMenu(item);
                      setShowModal(true);
                    }}
                  >
                    Add to Cart
                  </IonButton>
                </IonItem>
              ))}
          </IonList>

          <IonButton routerLink={routes.cart}>Cart</IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
