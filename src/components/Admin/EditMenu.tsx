import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
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
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

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
  const fileRef = useRef<HTMLInputElement>(null);

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
                      required
                      type="text"
                      inputmode="text"
                      autocapitalize="words"
                      value={name}
                      onIonChange={({ detail: { value } }) => setName(value!)}
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="floating">Price</IonLabel>
                    <IonInput
                      required
                      type="number"
                      inputmode="numeric"
                      value={price}
                      onIonChange={({ detail: { value } }) => setPrice(parseInt(value!, 10))}
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="floating">Description</IonLabel>
                    <IonInput
                      required
                      type="text"
                      inputmode="text"
                      autocapitalize="sentences"
                      autocorrect="on"
                      value={description}
                      onIonChange={({ detail: { value } }) => setDescription(value!)}
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
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol>
                  <IonButton
                    expand="block"
                    style={{ marginBottom: '20px' }}
                    onClick={() => fileRef?.current?.click()}
                  >
                    <input
                      hidden
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      onChange={({ target }) => {
                        if (target.files && target.files.length > 0) {
                          setPhoto(target.files[0]);
                          return;
                        }

                        setPhoto(undefined);
                      }}
                    />
                    {photo ? photo.name : 'Change photo'}
                  </IonButton>

                  <p style={{ textAlign: 'center' }}>
                    Menu photo is {photo ? photo.name : 'not yet changed!'}
                  </p>

                  <p style={{ textAlign: 'center' }}>Menu photo ref: {data.photoRef}</p>

                  <IonButton
                    expand="block"
                    fill="outline"
                    disabled={name === '' || description === ''}
                    onClick={async () => {
                      if (name === '' || description === '') {
                        return;
                      }

                      // upsert
                      // edit menu without photo, dismiss loading
                      if (!photo) {
                        presentLoading('Editing menu...');

                        try {
                          await updateMenu(data.id, {
                            name,
                            price,
                            description,
                            category,
                            updated: Date.now(),
                          });
                        } catch (err) {
                          if (err instanceof Error) {
                            present(err.message, 1000);
                          }

                          present('Internal server error detected!', 1000);
                        } finally {
                          dismissLoading();
                        }

                        // confirmation and switch
                        updater();
                        present('Menu edited!', 500);

                        // reset relevant states
                        setPhoto(undefined);
                        setIsOpen(false);
                        return;
                      }

                      // loading
                      presentLoading('Editing menu with photo...');

                      // upload image, edit menu, dismiss loading
                      // do in parallel
                      try {
                        const [uploadUrl, storageRef] = await uploadMenu(photo);

                        await Promise.all([
                          deleteMenu(data.photoRef),
                          updateMenu(data.id, {
                            name,
                            price,
                            description,
                            photo: uploadUrl,
                            photoRef: storageRef,
                            category,
                            updated: Date.now(),
                          }),
                        ]);
                      } catch (err) {
                        if (err instanceof Error) {
                          present(err.message, 1000);
                        }

                        present('Internal server error detected!', 1000);
                      } finally {
                        dismissLoading();
                      }

                      // confirmation and switch
                      updater();
                      present('Menu edited!', 500);

                      // reset relevant states
                      setPhoto(undefined);
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
