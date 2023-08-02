
/* NgRx */
import { createReducer, on } from '@ngrx/store';
import { ProductApiActions, ProductPageActions } from './actions';
import { Product } from '../model/product';

// State for this feature (Product)
export interface ProductState {
  showProductCode: boolean;
  showProductDescription: boolean;
  showProductFilter: boolean;
  currentProductId: number | null;
  lastSavedProductId: any | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  showProductDescription: true,
  showProductFilter: true,
  currentProductId: null,
  lastSavedProductId: null,
  products: [],
  error: ''
};

export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductPageActions.toggleProductCode, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    };
  }),
  on(ProductPageActions.toggleProductDescription, (state): ProductState => {
    return {
      ...state,
      showProductDescription: !state.showProductDescription
    };
  }),

  on(ProductPageActions.toggleProductFilter, (state): ProductState => {
    return {
      ...state,
      showProductFilter: !state.showProductFilter
    };
  }),
  
  on(ProductPageActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: action.currentProductId
    };
  }),

  on(ProductPageActions.setLastSavedProduct, (state, action): ProductState => {
    return {
      ...state,
      lastSavedProductId: action.lastSavedProductId
    };
  }),
  
  on(ProductPageActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: null
    };
  }),
  on(ProductPageActions.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0
    };
  }),
  on(ProductApiActions.loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: ''
    };
  }),
  on(ProductApiActions.loadProductsFailure, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error
    };
  }),
  on(ProductApiActions.updateProductSuccess, (state, action): ProductState => {
    const updatedProducts = state.products.map(
      item => action.product.id === item.id ? action.product : item);
    return {
      ...state,
      products: updatedProducts,
      currentProductId: action.product.id,
      error: ''
    };
  }),
  on(ProductApiActions.updateProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    };
  }),
  // After a create, the currentProduct is the new product.
  on(ProductApiActions.createProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: [...state.products, action.product],
      currentProductId: action.product.id,
      error: ''
    };
  }),
  on(ProductApiActions.createProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    };
  }),
  // After a delete, the currentProduct is null.
  on(ProductApiActions.deleteProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: state.products.filter(product => product.id !== action.productId),
      currentProductId: null,
      error: ''
    };
  }),
  on(ProductApiActions.deleteProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    };
  })
);
