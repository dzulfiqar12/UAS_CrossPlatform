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
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { updateMenu } from '../../firebase/firestore';
import { deleteMenu, uploadMenu } from '../../firebase/storage';
import type Menu from '../../types/Menu';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  updater: () => void;
  data: Menu | null;
};

const EditMenu = ({ isOpen, setIsOpen, updater, data }: Props) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<File>();
  const [category, setCategory] = useState('Ala Carte' as 'Ala Carte' | 'Paket' | 'Go Home');
  const [present] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  useEffect(() => {
    if (!data) {
      return;
    }

    setName(data.name);
    setPrice(data.price);
    setDescription(data.description);
    setCategory(data.category);
  }, [data]);

  return (
    <IonModal isOpen={isOpen}>
      {data && (
        <>
          <IonHeader translucent>
            <IonToolbar>
              <IonTitle>Edit Menu</IonTitle>

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
                    onClick={async () => {
                      if (name === '' || description === '') {
                        return;
                      }

                      // upsert
                      if (!photo) {
                        presentLoading('Editing menu...');
                        await updateMenu(data.id, {
                          name,
                          price,
                          description,
                          category,
                          updated: Date.now(),
                        });

                        // dismiss loading
                        dismissLoading();

                        // confirmation and switch
                        updater();
                        present('Menu edited!', 500);
                        setIsOpen(false);
                        return;
                      }

                      // loading
                      presentLoading('Editing menu with photo...');

                      // upload image
                      const [uploadUrl, storageRef] = await uploadMenu(photo);

                      // edit menu
                      await deleteMenu(data.photoRef);
                      await updateMenu(data.id, {
                        name,
                        price,
                        description,
                        photo: uploadUrl,
                        photoRef: storageRef,
                        category,
                        updated: Date.now(),
                      });

                      // dismiss loading
                      dismissLoading();

                      // confirmation and switch
                      updater();
                      present('Menu edited!', 500);
                      setIsOpen(false);
                    }}
                  >
                    Submit
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </>
      )}
    </IonModal>
  );
};

export default EditMenu;
