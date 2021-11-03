import React from 'react';
import {IonHeader, IonContent, IonToolbar, IonTitle, IonBackButton, IonButton} from '@ionic/react';
import { useEffect, useState } from 'react';

import { fetchFirestore } from '../firebase';
import { getMenu } from '../firebase/firestore';
import type Menu from '../types/Menu';
class ModalExample extends React.Component {

  render() {
    return <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detail Menu</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p>This is the modal content.</p>
      </IonContent>
    </>
  };

}

export default ModalExample;