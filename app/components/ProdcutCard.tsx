import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonNote,
    IonLabel,
  } from "@ionic/react";
  
  import { close } from "ionicons/icons";
  import { NextPage } from "next";
  import { Product } from "@/app/types/type";
  import useAppStore from "../hooks/useStore";
  import StarRating from '../components/StarRating';
  import { fetchProductAndSimilar } from '../services/searchService';
import { useEffect } from "react";

  interface ProductCardProps {
    open: boolean;
    onDidDismiss: () => void;
    product: Product;
  }
  
  const shopNames: { [key: number]: string } = {
    1: 'B&Q',
    2: 'Tradepoint',
    3: 'Screwfix',
    4: 'Wickes'
  };  

  const ProductCard: React.FC<ProductCardProps> = ({ open, onDidDismiss, product }) => {
    const { similarProducts } = useAppStore();

    useEffect(() => {
      fetchProductAndSimilar(product.objectID);
    }, [product.objectID]);
    
    return (
      <IonModal isOpen={open} onDidDismiss={onDidDismiss}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{product.product_name}</IonTitle>
            <IonButton slot="end" fill="clear" color="dark" onClick={onDidDismiss}>
              <IonIcon icon={close} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
             <IonItem>
                <IonLabel >
                    <img className="rounded-xl" src={product.image_url} alt={product.product_name} />
                </IonLabel>    
                <StarRating rating={product.rating} ratingCount={product.rating_count}/>     
            </IonItem>
          <IonList>
            <IonItem>
            <IonLabel>
                <ul className='list-disc pl-5'>
                    {product.features.map((feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Description: {product.product_description}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
              <IonList>
      {similarProducts.map((item) => (
        <IonItem key={item.objectID}>
          <IonLabel className="text-white">
            <h2>{item.product_name}</h2>
            <h4 className="text-gray-400">£{item.price}</h4>
            <h2 className="font-bold text-xs text-gray-400 dark:text-gray-100">{shopNames[item.shop_id]}</h2>

            <StarRating rating={product.rating} ratingCount={product.rating_count}/>     
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonModal>
    );
  };
  
  export default ProductCard;