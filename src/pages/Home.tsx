import {
  IonAvatar,
  IonButton,
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

import { fetchFirestore } from '../firebase';
import { getMenu } from '../firebase/firestore';
import type Menu from '../types/Menu';

const Home = () => {
  const [category, setCategory] = useState('Ala Carte' as 'Ala Carte' | 'Paket' | 'Go Home');
  const [menu, setMenu] = useState([] as Menu[]);

  useEffect(() => {
    getMenu(fetchFirestore())
      .then((res) => setMenu(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
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
              <IonItem key={item.id}>
                <IonAvatar slot="start">
                  <IonImg src={item.photo} alt={`Avatar of ${item.name}`} />
                </IonAvatar>

                <IonLabel>
                  <h2>{item.name}</h2>
                  <h3>{item.category}</h3>
                  <p>{item.description}</p>
                </IonLabel>
              </IonItem>
            ))}
        </IonList>

        <IonButton routerLink="/cart">Cart</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
