
export interface Item {
    name: string;
    done?: boolean;
}

export interface ListItem {
    id: string;
    name: string;
    items?: Item[];
    done?: boolean;
}


export interface Notification {
    title: string;
    when: string;
}

export interface HomeItem {
    title: string;
    type: string;
    text: string;
    author: string;
    authorAvatar: string;
    image: string;
}

export interface Product {
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
  