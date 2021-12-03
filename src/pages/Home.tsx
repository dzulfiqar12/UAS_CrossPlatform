import '../styles/Home.css';

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  cartSharp,
  checkmarkSharp,
  informationSharp,
  keySharp,
  personCircleSharp,
} from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import ModalCustomerInfo from '../components/ModalCustomerInfo';
import ModalSingleMenu from '../components/ModalSingleMenu';
import { getUser } from '../firebase/auth';
import { getMenu } from '../firebase/firestore';
import type Menu from '../types/Menu';
import OrderContext from '../utils/context';
import routes from '../utils/routes';

interface Params {
  tableName?: string;
}

export const Home: React.FC = () => {
  const { tableName } = useParams<Params>();
  const { state, dispatch } = useContext(OrderContext);
  const [category, setCategory] = useState('Ala Carte' as 'Ala Carte' | 'Paket' | 'Go Home');
  const [menu, setMenu] = useState([] as Menu[]);
  const [chosenMenu, setChosenMenu] = useState(null as Menu | null);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(true);
  const user = getUser();

  useEffect(() => {
    if (tableName) {
      dispatch({ type: 'setTableName', payload: tableName });
    }

    getMenu()
      .then((res) => setMenu(res))
      .catch((err) => console.error(err));
  }, [dispatch, tableName]);

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

          <div className="grid">
            {menu
              .filter((item) => item.category === category)
              .map((item) => (
                <div
                  key={item.id}
                  className="card"
                  onClick={() => {
                    setChosenMenu(item);
                    setShowMenuModal(true);
                  }}
                >
                  <div>
                    <img
                      className="card__img"
                      src="https://preview.redd.it/8rpzub06bcw71.jpg?width=3054&format=pjpg&auto=webp&s=32c96957f96cf8c6d05d2a5f3f5d9c5a1a34274f"
                      alt={`Avatar of ${item.name}`}
                    />
                  </div>

                  <div className="card__content">
                    <h2 className="card__title">{item.name}</h2>
                    <h3 className="card__price">Rp. {item.price.toLocaleString('id-ID')}</h3>
                  </div>

                  <div className="card__spacer"></div>

                  {(() => {
                    const orderedItem = state.items.find((o) => o.menuId === item.id);

                    // if user is logged in, do not show 'add to cart'
                    if (user) {
                      return;
                    }

                    if (!orderedItem) {
                      return (
                        <IonButton
                          expand="block"
                          size="small"
                          color="warning"
                          onClick={() => {
                            setChosenMenu(item);
                            setShowMenuModal(true);
                          }}
                        >
                          <IonIcon slot="start" icon={cartSharp} style={{ fontSize: '12px' }} />
                          <p className="card__button">Add</p>
                        </IonButton>
                      );
                    }

                    return (
                      <IonButton
                        expand="block"
                        size="small"
                        color="warning"
                        onClick={() => {
                          setChosenMenu(item);
                          setShowMenuModal(true);
                        }}
                      >
                        <IonIcon slot="start" icon={checkmarkSharp} style={{ fontSize: '12px' }} />
                        <p className="card__button">Ordered: {orderedItem.quantity}</p>
                      </IonButton>
                    );
                  })()}
                </div>
              ))}
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
