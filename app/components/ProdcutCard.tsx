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
    if (open && product.objectID) {
      fetchProductAndSimilar(product.objectID);
    }
  }, [open, product.objectID, fetchProductAndSimilar]);

  
  return (
    <IonModal isOpen={open} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='text-sm'>{product.product_name}</IonTitle>
          <IonButton slot="end" fill="clear" color="danger" onClick={onDidDismiss}>
            <IonIcon icon={close} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem lines="none">
          <IonLabel>
            <img className="rounded-xl" src={product.image_url} alt={product.product_name} />
          </IonLabel>     
        </IonItem>
        <IonList>
          <IonItem lines="none">
            <IonLabel>
              <h1 className="border-b border-gray-800 pb-1">Features:</h1>
              <ul className='list-disc pl-5 text-sm  '>
                {product.features.map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonLabel>
              <h1 className="border-b border-gray-800 pb-1">Description:</h1>
              <div className="mt-1 text-sm  ">
                {product.product_description}
              </div>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <IonList>
                <h1 className="border-b border-gray-800 pb-1">Products:</h1>
                {similarProducts.map((item) => (
                  <IonItem key={item.objectID} button onClick={() => window.open(item.page_url, '_blank')} lines="none">
                    <IonLabel className="text-white">
                    <div className="flex items-stretch">
                      <div className="w-1/3 relative overflow-hidden ">
                        <img className="object-cover w-full h-full rounded-md " src={item.image_url} alt={item.product_name} />
                      </div>
                      
                      <div className="w-3/4 pl-4 space-y-1 flex flex-col justify-between">
                        <div>
                            <h4 className="font-bold text-xs  uppercase">{item.category_name}</h4>
                            <h2 className="font-bold text-xs ">{item.product_name}</h2>
                            <StarRating rating={item.rating} ratingCount={item.rating_count}/>
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                            <span className="font-bold text-lg ">£{Number(item.price).toFixed(2)}</span>
                            <h2 className="font-bold text-xs ">{shopNames[item.shop_id]}</h2>
                        </div>
                      </div>
                    </div>
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