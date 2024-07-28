import algoliasearch from 'algoliasearch/lite';
import dotenv from 'dotenv';
dotenv.config();

// Initialize Algolia client
const appId = process.env.NEXT_PUBLIC_AGOLIA as string;
const apiKey = process.env.NEXT_PUBLIC_AGOLIA_PASSWORD as string;
const client = algoliasearch(appId, apiKey);
const index = client.initIndex('main_index');
const searchClient = algoliasearch(appId, apiKey);

export { index, searchClient };