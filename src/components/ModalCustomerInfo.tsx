import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
} from '@ionic/react';
import { Dispatch, SetStateAction, useContext } from 'react';

import OrderContext from '../utils/context';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalCustomerInfo = ({ isOpen, setIsOpen }: Props) => {
  const { state, dispatch } = useContext(OrderContext);

  return (
    <IonModal isOpen={isOpen}>
      <IonList lines="full" class="ion-no-margin">
        <IonListHeader lines="full">
          <IonLabel>Information</IonLabel>
        </IonListHeader>

        <IonItem>
          <IonLabel position="floating">Customer Name</IonLabel>
          <IonInput
            type="text"
            value={state.customerName}
            onIonChange={({ detail: { value } }) =>
              dispatch({ type: 'setCustomerName', payload: value as string })
            }
            placeholder="Your name..."
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Table number</IonLabel>
          <IonInput
            type="text"
            value={state.tableName}
            onIonChange={({ detail: { value } }) =>
              dispatch({ type: 'setTableName', payload: value as string })
            }
            placeholder="Your table number..."
          />
        </IonItem>

        <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
      </IonList>
    </IonModal>
  );
};

export default ModalCustomerInfo;
