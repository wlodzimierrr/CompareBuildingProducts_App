import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonInput,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { useState } from "react";
import { add, close } from 'ionicons/icons';

interface BuyListItem {
  id: number;
  name: string;
}

const BuyList = () => {
  const [items, setItems] = useState<BuyListItem[]>([]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim() !== "") {
      setItems([...items, { id: Date.now(), name: newItem }]);
      setNewItem("");
    }
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Shopping List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>

        <IonList>
          {items.map((item) => (
            <IonItem key={item.id}>
              <IonLabel>{item.name}</IonLabel>
              <IonButton fill="clear" onClick={() => removeItem(item.id)}>
                <IonIcon icon={close} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
        <IonItem>
          <IonInput
            value={newItem}
            placeholder="Add new item"
            onIonChange={e => setNewItem(e.detail.value!)}
          />
          <IonButton onClick={addItem}>
            <IonIcon icon={add} />
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default BuyList;
