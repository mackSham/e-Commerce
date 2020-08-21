export const ADD_CART_PRODUCT = 'ADD_CART_PRODUCT';
export const REMOVE_CART_PRODUCT = 'REMOVE_CART_PRODUCT';
export const DELETE_CART_PRODUCT = 'DELETE_CART_PRODUCT';

export const addCartProduct = (id) => {
  return { type: ADD_CART_PRODUCT, productId: id };
};
export const removeCartProduct = (id) => {
  return { type: REMOVE_CART_PRODUCT, productId: id };
};
export const deleteCartProduct = (id) => {
  return { type: DELETE_CART_PRODUCT, productId: id };
};
