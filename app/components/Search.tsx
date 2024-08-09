import React from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem, IonLabel, IonButtons, IonMenuButton, IonItemDivider } from '@ionic/react'
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
        <IonList>
        <Card className="my-2" onClick={() => setShowProductCard(true)} >
        <div className="flex items-stretch ">
            <div className="w-1/3 h-40 relative overflow-hidden ">
            <img className="object-cover w-full h-full rounded-md " src={image_url} alt={product_name} />
            </div>
            <div className="w-3/4 pl-4 py-2 flex flex-col justify-between">
            <div>
                <h4 className="font-bold text-xs uppercase">{category_name}</h4>
                <h2 className="font-bold text-xs ">{product_name}</h2>
                {/* <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{product_description}</p> */}
                <h2 className="font-bold text-xs ">{shopNames[shop_id]}</h2>
            </div>
            <div className="flex items-center mt-1">
                <StarRating rating={rating} ratingCount={rating_count}/>
            </div>
            <div className="flex items-center justify-between mt-auto">
                <span className="font-bold text-lg ">£{Number(price).toFixed(2)}</span></div>
            </div>
        </div>
        </Card>
        <hr className="border-t border-gray-300 dark:border-gray-700" />
    </IonList>
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

const Search = () => {
  const { homeItems } = useAppStore();
  const { searchQuery, setSearchQuery, fetchAndSetHomeItems } = useAppStore();
  const [showTopToolbar, setShowTopToolbar] = useState(true);

  useEffect(() => {
    if (searchQuery) {
      fetchAndSetHomeItems();
    }
  }, [searchQuery, fetchAndSetHomeItems]);

  const logScrolling = (e: CustomEvent) => {
    const scrollTop = e.detail.scrollTop;
    setShowTopToolbar(scrollTop < 90); // Adjust the threshold as needed
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="flex mt-2">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonSearchbar
              className="text-white"
              placeholder="What are you looking for?"
              value={searchQuery}
              onIonChange={(e) => setSearchQuery(e.detail.value!)}
              onIonClear={() => setSearchQuery('')}
            />
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent
        scrollEvents={true}
        onIonScroll={logScrolling}
        fullscreen
      >
        <SvgBackground />
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


export default Search
