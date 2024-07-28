import { create } from 'zustand'
import { lists, homeItems, notifications } from '@/app/mock/data';
import { ListItem,Notification ,HomeItem, Item, Product} from '../types/type';
import { searchProducts } from '@/app/services/searchService';
import { searchClient } from '../lib/algoliaSearch'
import instantsearch, { SearchResponse, Hit, HitHighlightResult } from 'instantsearch.js/es';
import { lookingSimilar } from 'instantsearch.js/es/widgets';
import algoliasearch from 'algoliasearch/lite';

interface Store {
    safeAreaTop: number;
    safeAreaBottom: number;
    menuOpen: boolean;
    notificationsOpen: boolean;
    currentPage: string | null;
    homeItems: Product[];
    lists: ListItem[];
    notifications: Notification[];
    settings: {
        enableNotifications: boolean;
    };
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    fetchAndSetHomeItems: () => Promise<void>;
    setMenuOpen: (menuOpen: boolean) => void;
    setNotificationsOpen: (notificationsOpen: boolean) => void;
    setSettings: (settings: { enableNotifications: boolean }) => void;
    setDone: (itemId: string, item:Item, done: boolean) => void;
    setHomeItems: (items: Product[]) => void;
    similarProducts: Product[];
    setSimilarProducts: (products: Product[]) => void;
}


const useAppStore = create<Store>((set, get) => ({
    // Initial state
    searchQuery: '',
    safeAreaTop: 0,
    safeAreaBottom: 0,
    menuOpen: false,
    notificationsOpen: false,
    currentPage: null,
    homeItems: [],
    lists: lists,
    notifications: notifications,
    settings: {
        enableNotifications: true,
    },
    similarProducts: [],
    setSimilarProducts: (products) => set({ similarProducts: products }),

    // Actions
    setMenuOpen: (menuOpen: boolean) => set({ menuOpen }),
    setNotificationsOpen: (notificationsOpen: boolean) => set({ notificationsOpen }),
    setSettings: (settings) => set((state) => ({ settings: { ...state.settings, ...settings } })),
    setDone: (itemId,item, done) => {
        // Implement logic to mark an item as done, example for `homeItems`
        const filteredItems = get().lists.find((list) => list.id === itemId);
        if (!filteredItems) return;
        filteredItems.items = filteredItems.items ?? [];
        filteredItems.items = filteredItems.items.map((i) => {
            if (i.name === item.name) {
                i.done = done;
            }
            return i;
        });
        const updatedItems = get().lists.map((list) => {
            if (list.id === itemId) {
                return filteredItems;
            }
            return list;
        });
        set({ lists: updatedItems });
    },
    setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },
    fetchAndSetHomeItems: async () => {
        const { searchQuery } = get();
        if (!searchQuery) return;
        try {
            const results = await searchProducts(searchQuery);
           
            set({
                homeItems: results.map(item => ({
                    product_id: item.product_id,
                    image_url: item.image_url,
                    product_name: item.product_name,
                    product_description: item.product_description,
                    price: item.price,
                    page_url: item.page_url,
                    shop_id: item.shop_id,
                    category_name: item.category_name,
                    subcategory_name: item.subcategory_name,
                    rating_count: item.rating_count,
                    rating: item.rating,
                    category_id: item.category_id,
                    subcategory_id: item.subcategory_id,
                    objectID: item.objectID,
                    features: item.features,
                })),
            });
        } catch (error) {
            console.error('Failed to fetch items:', error);
        }
    },
    setHomeItems: (items: Product[]) => set({ homeItems: items }),

}));

export default useAppStore;

