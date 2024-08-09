import { index } from '../lib/algoliaSearch';
import { Product } from '../types/type';
import instantsearch, { SearchResponse, Hit, HitHighlightResult } from 'instantsearch.js/es';
import { lookingSimilar } from 'instantsearch.js/es/widgets';
import { searchClient } from '../lib/algoliaSearch';
import useAppStore from "../hooks/useStore";

interface Result extends Hit<Product> {
  _highlightResult: {
    product_name: HitHighlightResult;
    [key: string]: any;
  };
}

// Function to search products based on a query
export const searchProducts = async (query: string) => {
  try {
    const { hits } = await index.search<Product>(query, { hitsPerPage: 10 });
    return hits;
  } catch (error) {
    console.error('Search failed:', error);
    return [];
  }
};

export const fetchProductAndSimilar = async (objectID: string) => {
  if (!objectID) return;

  const { setSimilarProducts } = useAppStore.getState();

  try {
    // Fetch the main product
    const searchResponse = await searchClient.search([
      {
        indexName: 'main_index',
        query: '',
        params: {
          filters: `objectID:${objectID}`,
        },
      },
    ]);

    const fetchedProduct = (searchResponse.results[0] as SearchResponse<Product>).hits[0];

    if (!fetchedProduct) {
      console.error('Product not found');
      return;
    }

    // Fetch similar products
    const search = instantsearch({
      indexName: 'main_index',
      searchClient,
    });

    const container = document.createElement('div');

    search.addWidgets([
      lookingSimilar({
        container,
        objectIDs: [fetchedProduct.objectID],
        transformItems(items) {
          // Ensure the main product isn't duplicated in the similar products list
          const similarProducts = items as unknown as Result[];
          const filteredProducts = similarProducts.filter(p => p.objectID !== fetchedProduct.objectID);

          // Add the main product at the top of the list
          const combinedProducts = [fetchedProduct as unknown as Result, ...filteredProducts];

          setSimilarProducts(combinedProducts);
          return combinedProducts;
        },
      }),
    ]);

    search.start();

    return () => {
      search.dispose();
    };
  } catch (error) {
    console.log('Error fetching item:', error);
  }
};
