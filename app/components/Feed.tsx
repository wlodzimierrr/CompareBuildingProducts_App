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

const shopNames: { [key: number]: string } = {
  1: 'B&Q',
  2: 'Tradepoint',
  3: 'Screwfix',
  4: 'Wickes'
};

interface FeedCardProps {
  product_id: number;
  image_url: string;
  product_name: string;
  price: string;
  page_url: string;
  shop_id: number;
  category_name: string;
  subcategory_name: string;
  rating_count: number;
  rating: number;
  category_id: number;
  subcategory_id: number;
  objectID: string;
  product_description: string;
  features: string[];
}

const FeedCard: FC<FeedCardProps> = ({ 
  product_id,
  image_url,
  product_name,
  price,
  page_url,
  shop_id,
  category_name,
  subcategory_name,
  rating_count,
  rating,
  category_id,
  subcategory_id,
  objectID,
  product_description,
  features,
}) => {
  const [showProductCard, setShowProductCard] = useState(false);
  return (
    <>
    <Card className="my-1 mx-auto" onClick={() => setShowProductCard(true)}>
    <div className="flex items-stretch">
      <div className="w-1/3 h-40 relative">
        <img className="object-cover w-full h-full rounded-l-xl" src={image_url} alt={product_name} />
      </div>
      <div className="w-2/3 px-4 py-2 bg-white rounded-r-xl dark:bg-gray-900 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-xs text-gray-400 dark:text-gray-500 uppercase">{category_name}</h4>
          <h2 className="font-bold text-xs text-gray-800 dark:text-gray-100">{product_name}</h2>
          {/* <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{product_description}</p> */}
          <h2 className="font-bold text-xs text-gray-400 dark:text-gray-100">{shopNames[shop_id]}</h2>
        </div>
        <div className="flex items-center space-x-1 mt-1">
            <StarRating rating={rating} ratingCount={rating_count}/>
          </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-bold text-lg text-gray-800 dark:text-gray-100">£{Number(price).toFixed(2)}</span></div>
      </div>
    </div>
  </Card>
  <ProductCard
  open={showProductCard}
  onDidDismiss={() => setShowProductCard(false)}
  product={{
    product_id,
    image_url,
    product_name,
    price,
    page_url,
    shop_id,
    category_name,
    subcategory_name,
    rating_count,
    rating,
    category_id,
    subcategory_id,
    objectID,
    product_description,
    features
  }}
/>
 </>
  )
};
const Feed = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { homeItems } = useAppStore();
  const { searchQuery, setSearchQuery, fetchAndSetHomeItems } = useAppStore();

  useEffect(() => {
    if (searchQuery) {
      fetchAndSetHomeItems();
    }
  }, [searchQuery, fetchAndSetHomeItems]);
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
          <div className="flex mt-2">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonSearchbar
              className="text-black"
              placeholder="What are you looking for?"
              value={searchQuery}
              onIonChange={(e) => setSearchQuery(e.detail.value!)}
              onIonClear={() => setSearchQuery('')}
            />
            <IonButtons slot="end">
              <IonButton className="pb-3" onClick={() => setShowNotifications(true)}>
                <IonIcon icon={notificationsOutline} />
              </IonButton>
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <SvgBackground />
        <IonHeader  >
      
        <h1 className="text-center text-amber-500 bg-stone-900 mb-4">
        <div className="flex flex-col items-center justify-center h-16 font-bold">
          <Icons.Hammer className="inline-block " />
          <span>Compare Building</span>
          <span>Products</span>
        </div>
      </h1>
   
        </IonHeader>
        <Notifications
          open={showNotifications}
          onDidDismiss={() => setShowNotifications(false)}
        />
        {homeItems.map((product, index) => (
          <FeedCard 
            key={index}
            product_id={product.product_id}
            image_url={product.image_url}
            product_name={product.product_name}
            price={product.price}
            page_url={product.page_url}
            shop_id={product.shop_id}
            category_name={product.category_name}
            subcategory_name={product.subcategory_name}
            rating_count={product.rating_count}
            rating={product.rating}
            category_id={product.category_id}
            subcategory_id={product.subcategory_id}
            objectID={product.objectID}
            product_description={product.product_description}
            features={product.features}
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Feed;