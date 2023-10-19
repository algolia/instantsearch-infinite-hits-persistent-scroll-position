import { Hit } from 'instantsearch.js';

export type ProductHit = Hit<{
  name: string;
  description: string;
  brand: string;
  categories: string[];
  image: string;
}>;
