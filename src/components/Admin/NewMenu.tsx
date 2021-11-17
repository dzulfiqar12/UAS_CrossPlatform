import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonModal,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonToast,
} from '@ionic/react';
import { nanoid } from 'nanoid';
import { Dispatch, SetStateAction, useState } from 'react';

import { createMenu } from '../../firebase/firestore';
import { uploadMenu } from '../../firebase/storage';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  updater: () => void;
};

const NewMenu = ({ isOpen, setIsOpen, updater }: Props) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<File>();
  const [category, setCategory] = useState('Ala Carte' as 'Ala Carte' | 'Paket' | 'Go Home');
  const [present] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>New Menu</IonTitle>

          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Menu name</IonLabel>
                <IonInput
                  value={name}
                  onIonChange={({ detail: { value } }) => setName(value!)}
                  type="text"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Price</IonLabel>
                <IonInput
                  value={price}
                  onIonChange={({ detail: { value } }) => setPrice(parseInt(value!, 10))}
                  type="number"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Description</IonLabel>
                <IonInput
                  value={description}
                  onIonChange={({ detail: { value } }) => setDescription(value!)}
                  type="text"
                />
              </IonItem>

              <IonItem>
                <IonLabel>Category</IonLabel>
                <IonSelect
                  interface="alert"
                  value={category}
                  onIonChange={({ detail: { value } }) => setCategory(value)}
                >
                  <IonSelectOption value="Ala Carte">Ala Carte</IonSelectOption>
                  <IonSelectOption value="Paket">Paket</IonSelectOption>
                  <IonSelectOption value="Go Home">Go Home</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItemDivider />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : undefined)}
              />

              <IonItemDivider />

              <IonButton
                expand="block"
                fill="outline"
                disabled={!photo || name === '' || description === ''}
                onClick={async () => {
                  if (name === '' || description === '' || !photo) {
                    return;
                  }

                  // loading
                  presentLoading('Adding new menu...');

                  // upload image
                  const [uploadUrl, storageRef] = await uploadMenu(photo);

                  // create new menu
                  await createMenu({
                    id: nanoid(),
                    name,
                    price,
                    description,
                    photo: uploadUrl,
                    photoRef: storageRef,
                    category,
                    created: Date.now(),
                    updated: Date.now(),
                  });

                  // dismiss loading
                  dismissLoading();

                  // confirmation and switch
                  updater();
                  present('Menu added!', 500);
                  setIsOpen(false);
                }}
              >
                Submit
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default NewMenu;