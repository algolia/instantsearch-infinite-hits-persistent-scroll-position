import algoliasearchlite from 'algoliasearch/lite';
import algoliasearch from 'algoliasearch';

import { APP_ID, SEARCH_API_KEY } from './constants';

export const searchClientLite = algoliasearchlite(APP_ID, SEARCH_API_KEY);
export const searchClient = algoliasearch(APP_ID, SEARCH_API_KEY);
