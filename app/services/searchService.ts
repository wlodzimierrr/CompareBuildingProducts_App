import { index } from '../lib/algoliaSearch';
import { Product } from '../types/type';
import instantsearch, { SearchResponse, Hit, HitHighlightResult } from 'instantsearch.js/es';
import { lookingSimilar } from 'instantsearch.js/es/widgets';
import { searchClient } from '../lib/algoliaSearch';
import useAppStore from "../hooks/useStore";

interface SearchResult extends Product {
  objectID: string;
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
    const resultsResponse = await searchClient.search([
      {
        indexName: 'main_index',
        query: fetchedProduct.product_name,
        params: {
          hitsPerPage: 20,
          removeWordsIfNoResults: 'firstWords',
          advancedSyntax: true,
          optionalWords: fetchedProduct.product_name.split(' '),
          typoTolerance: true,
          ignorePlurals: true,
        },
      },
    ]);

    const topMatches = (resultsResponse.results[0] as SearchResponse<SearchResult>).hits;
    
          setSimilarProducts(topMatches);
          return topMatches;
   
  } catch (error) {
    console.log('Error fetching item:', error);
  }
};
