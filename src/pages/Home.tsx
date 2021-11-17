import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
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
import { cartSharp, informationSharp, keySharp, personCircleSharp } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';

import ModalCustomerInfo from '../components/ModalCustomerInfo';
import ModalSingleMenu from '../components/ModalSingleMenu';
import { getUser } from '../firebase/auth';
import { getMenu } from '../firebase/firestore';
import type Menu from '../types/Menu';
import OrderContext from '../utils/context';
import routes from '../utils/routes';

export const Home: React.FC = () => {
  const { state } = useContext(OrderContext);
  const [category, setCategory] = useState('Ala Carte' as 'Ala Carte' | 'Paket' | 'Go Home');
  const [menu, setMenu] = useState([] as Menu[]);
  const [chosenMenu, setChosenMenu] = useState({} as Menu);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(true);
  const user = getUser();

  useEffect(() => {
    console.log('Currently logged in user:');
    console.log(getUser());
    console.log(state);

    getMenu()
      .then((res) => setMenu(res))
      .catch((err) => console.error(err));
  }, [user, state]);

  return (
    <>
      <ModalSingleMenu menu={chosenMenu} isOpen={showMenuModal} setIsOpen={setShowMenuModal} />
      <ModalCustomerInfo isOpen={showInfoModal} setIsOpen={setShowInfoModal} />

      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonTitle>Home</IonTitle>
            </IonButtons>

            <IonButtons slot="end">
              <IonButton slot="icon-only" routerLink={routes.cart}>
                <IonIcon slot="icon-only" icon={cartSharp} />
              </IonButton>
              <IonButton slot="icon-only" onClick={() => setShowInfoModal(true)}>
                <IonIcon slot="icon-only" icon={informationSharp} />
              </IonButton>

              {user ? (
                <IonButton slot="icon-only" routerLink={routes.admin}>
                  <IonIcon slot="icon-only" icon={personCircleSharp} />
                </IonButton>
              ) : (
                <IonButton slot="icon-only" routerLink={routes.login}>
                  <IonIcon slot="icon-only" icon={keySharp} />
                </IonButton>
              )}
            </IonButtons>
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
                    setShowMenuModal(true);
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

                    {(() => {
                      const orderedItem = state.items.find((o) => o.menuId === item.id);

                      if (!orderedItem) {
                        return (
                          <IonButton
                            onClick={() => {
                              setChosenMenu(item);
                              setShowMenuModal(true);
                            }}
                          >
                            Add to Cart
                          </IonButton>
                        );
                      }

                      return (
                        <IonButton
                          onClick={() => {
                            setChosenMenu(item);
                            setShowMenuModal(true);
                          }}
                        >
                          Ordered: {orderedItem.quantity}
                        </IonButton>
                      );
                    })()}
                  </IonLabel>
                </IonItem>
              ))}
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
