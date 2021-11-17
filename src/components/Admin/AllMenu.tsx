import {
  IonAvatar,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonTitle,
  useIonActionSheet,
} from '@ionic/react';
import { addSharp, closeSharp, trashSharp } from 'ionicons/icons';
import { Suspense, useEffect, useState } from 'react';

import { deleteMenu, getMenu } from '../../firebase/firestore';
import { deleteMenu as deleteMenuPhoto } from '../../firebase/storage';
import type Menu from '../../types/Menu';
import EditMenu from './EditMenu';
import NewMenu from './NewMenu';

const AllMenu = () => {
  const [menu, setMenu] = useState([] as Menu[]);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null as Menu | null);
  const [presentActionSheet, dismissActionSheet] = useIonActionSheet();

  const fetchMenu = () => {
    getMenu()
      .then((res) => setMenu(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <NewMenu isOpen={showNewModal} setIsOpen={setShowNewModal} updater={fetchMenu} />
        <EditMenu
          isOpen={showEditModal}
          setIsOpen={setShowEditModal}
          updater={fetchMenu}
          data={editingMenu}
        />
      </Suspense>

      <IonList>
        <IonListHeader>
          <IonTitle>Admin Menu</IonTitle>
        </IonListHeader>

        {menu.map((item) => (
          <IonItem onClick={() => {}} key={item.id}>
            <IonAvatar slot="start">
              <IonImg src={item.photo} alt={`Avatar of ${item.name}`} />
            </IonAvatar>

            <IonLabel>
              <h2>{item.name}</h2>
              <h3>{item.category}</h3>
              <p>{item.description}</p>

              <IonButton
                onClick={() => {
                  setEditingMenu(item);
                  setShowEditModal(true);
                }}
              >
                Edit
              </IonButton>

              <IonButton
                onClick={() => {
                  presentActionSheet({
                    header: 'Are you sure you want to delete this menu?',
                    subHeader: 'This action cannot be reversed.',
                    buttons: [
                      {
                        text: 'Delete',
                        role: 'destructive',
                        icon: trashSharp,
                        handler: async () => {
                          await deleteMenuPhoto(item.photoRef);
                          await deleteMenu(item.id);
                          fetchMenu();
                          dismissActionSheet();
                        },
                      },
                      {
                        text: 'Cancel',
                        role: 'cancel',
                        icon: closeSharp,
                      },
                    ],
                  });
                }}
              >
                Delete
              </IonButton>
            </IonLabel>
          </IonItem>
        ))}
      </IonList>

      <IonFab vertical="bottom" horizontal="end" slot="fixed" className="ion-padding">
        <IonFabButton onClick={() => setShowNewModal(true)}>
          <IonIcon icon={addSharp} />
        </IonFabButton>
      </IonFab>
    </>
  );
};

export default AllMenu;
