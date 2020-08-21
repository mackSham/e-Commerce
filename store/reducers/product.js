import { PRODUCT } from '../../data/dummyData';
import { ADD_CART_PRODUCT } from './../actions/product';
import { REMOVE_CART_PRODUCT } from './../actions/product';
import { DELETE_CART_PRODUCT } from './../actions/product';

const initialState = {
  products: PRODUCT,
  categoryProducts: PRODUCT,
  filteredProducts: [],
  wishListProduct: PRODUCT,
  cartProducts: [
    { productId: 'p1', noOfItems: 2, checked: true },
    { productId: 'p2', noOfItems: 4, checked: true },
  ],
};
const productReducer = (state = initialState, action) => {
  let existingIndex;
  switch (action.type) {
    case ADD_CART_PRODUCT:
      existingIndex = state.cartProducts.findIndex((product) => product.productId === action.productId);

      //Product found
      if (existingIndex >= 0) {
        const clonedCart = [...state.cartProducts];
        const clonedCartItem = { ...clonedCart[existingIndex] };
        clonedCartItem.noOfItems += 1;
        clonedCart[existingIndex] = clonedCartItem;

        return { ...state, cartProducts: clonedCart };
      } else {
        return {
          ...state,
          cartProducts: state.cartProducts.concat({ productId: action.productId, noOfItems: 1, checked: true }),
        };
      }
    case REMOVE_CART_PRODUCT:
      existingIndex = state.cartProducts.findIndex((product) => product.productId === action.productId);
      //Product found
      if (existingIndex >= 0) {
        const clonedCart = [...state.cartProducts];
        const clonedCartItem = { ...clonedCart[existingIndex] };
        clonedCartItem.noOfItems -= 1;
        if (clonedCartItem.noOfItems === 0) {
          clonedCart.splice(existingIndex, 1);
        } else {
          clonedCart[existingIndex] = clonedCartItem;
        }
        return { ...state, cartProducts: clonedCart };
      } else {
        return state;
      }
    case DELETE_CART_PRODUCT:
      existingIndex = state.cartProducts.findIndex((product) => product.productId === action.productId);
      //Product found
      if (existingIndex >= 0) {
        const clonedCart = [...state.cartProducts];
        clonedCart.splice(existingIndex, 1);
        return { ...state, cartProducts: clonedCart };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default productReducer;
