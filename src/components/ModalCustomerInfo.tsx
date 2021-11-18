import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
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
    <IonModal isOpen={isOpen} swipeToClose={false} backdropDismiss={false}>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Customer Information</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol className="ion-text-center">
              <IonText>
                <p style={{ fontSize: '14px' }}>
                  Please fill your information before using this app!
                </p>
              </IonText>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Customer name</IonLabel>
                <IonInput
                  required
                  type="text"
                  inputmode="text"
                  autocapitalize="words"
                  value={state.customerName}
                  onIonChange={({ detail: { value } }) =>
                    dispatch({ type: 'setCustomerName', payload: value as string })
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Table name</IonLabel>
                <IonInput
                  required
                  type="text"
                  inputmode="text"
                  autocapitalize="characters"
                  value={state.tableName}
                  onIonChange={({ detail: { value } }) =>
                    dispatch({ type: 'setTableName', payload: value as string })
                  }
                />
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton
                expand="block"
                fill="outline"
                disabled={state.customerName === '' || state.tableName === ''}
                onClick={() => setIsOpen(false)}
              >
                Set data
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default ModalCustomerInfo;
