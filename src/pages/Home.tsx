import '../styles/Home.css';

import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { cartSharp, informationSharp, keySharp, personCircleSharp } from 'ionicons/icons';
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
  const [chosenMenu, setChosenMenu] = useState({} as Menu);
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

          {/* <IonList>
            <IonListHeader>
              <IonTitle>Menu</IonTitle>
            </IonListHeader> */}
          <IonGrid className="menu">
            <IonRow>
              {menu
                .filter((item) => item.category === category)
                .map((item) => (
                  <IonCol size="6">
                    {/* <IonItem */}
                    <IonCard
                      className="card"
                      onClick={() => {
                        setChosenMenu(item);
                        setShowMenuModal(true);
                      }}
                      key={item.id}
                    >
                      {/* > */}
                      {/* <IonAvatar slot="start"> */}
                      {/* <IonImg src={item.photo} alt={`Avatar of ${item.name}`} className="img" /> */}
                      {/* </IonAvatar> */}
                      <img src={item.photo} alt={`Avatar of ${item.name}`} className="img" />
                      <IonCardHeader>
                        <IonCardTitle className="card-title">{item.name}</IonCardTitle>
                        <IonCardSubtitle>
                          <p style={{ marginBottom: -4 }}>{item.category}</p>
                        </IonCardSubtitle>
                      </IonCardHeader>
                      <IonCardContent>
                        {/* <IonLabel> */}
                        <div className="card-deskripsi">{item.description}</div>

                        {(() => {
                          const orderedItem = state.items.find((o) => o.menuId === item.id);

                          if (!orderedItem) {
                            return (
                              <IonButton
                                className="button"
                                size="small"
                                onClick={() => {
                                  setChosenMenu(item);
                                  setShowMenuModal(true);
                                }}
                                shape="round"
                              >
                                Add to Cart
                              </IonButton>
                            );
                          }

                          return (
                            <IonButton
                              className="button"
                              size="small"
                              onClick={() => {
                                setChosenMenu(item);
                                setShowMenuModal(true);
                              }}
                              shape="round"
                            >
                              Ordered: {orderedItem.quantity}
                            </IonButton>
                          );
                        })()}
                        {/* </IonLabel> */}
                      </IonCardContent>
                    </IonCard>
                    {/* </IonItem> */}
                  </IonCol>
                ))}
              {/* </IonList> */}
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
