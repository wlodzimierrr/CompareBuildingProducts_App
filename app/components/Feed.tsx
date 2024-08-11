import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC, useEffect, useState } from "react";
import { notificationsOutline } from "ionicons/icons";
import Notifications from "./Notifications";
import useAppStore from "../hooks/useStore";
import Card from "./Card";
import { Icons } from "./Icons";
import { SvgBackground } from '../components/Icons';
import StarRating from '../components/StarRating';
import ProductCard from "./ProdcutCard";
import { useHistory } from "react-router-dom";


const Feed = () => {
  const history = useHistory();
  const { homeItems } = useAppStore();
  const { searchQuery, setSearchQuery, fetchAndSetHomeItems } = useAppStore();

  useEffect(() => {
    if (searchQuery) {
      fetchAndSetHomeItems();
    }
  }, [searchQuery, fetchAndSetHomeItems]);

  const handleSearch = (event: CustomEvent) => {
    const query = event.detail.value!;
    setSearchQuery(query);
    history.push(`/tabs/search`);
  };

  return (
    <IonPage>
      <IonHeader>
          <IonToolbar>
            <h1 className="text-center text-amber-500">
              <div className="flex flex-col items-center justify-center font-bold">
                <Icons.Hammer className="inline-block" />
                <span>Compare Building Products</span>
              </div>
            </h1>
          </IonToolbar>
        <IonToolbar>
          <div className="flex mt-2">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonSearchbar
              className="text-white"
              placeholder="What are you looking for?"
              onIonChange={handleSearch}
              onIonClear={() => setSearchQuery('')}
            />
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent 
        fullscreen
      >
        <SvgBackground />
      </IonContent>
    </IonPage>
  );
};

export default Feed;