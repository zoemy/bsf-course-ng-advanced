import { createAction, props } from '@ngrx/store';
import { Product } from '../../models';

export const fetchProducts = createAction('[Products] Fetch products');

export const setProducts = createAction(
	'[Products] Set products',
	props<{ products: Product[] }>()
);

export const updateProduct = createAction(
	'[Products] Update product',
	props<{ product: Product }>()
);
export const deleteProduct = createAction(
	'[Products] Delete product',
	props<{ productId: number }>()
);
