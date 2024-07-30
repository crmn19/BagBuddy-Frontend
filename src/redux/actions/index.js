export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const addToCart = () => ({
  type: ADD_TO_CART,
});

export const removeFromCart = () => ({
  type: REMOVE_FROM_CART,
});
//shippingActions
export const SET_METODO_SPEDIZIONE = "SET_METODO_SPEDIZIONE";

export const setMetodoSpedizione = metodo => ({
  type: SET_METODO_SPEDIZIONE,
  payload: metodo,
});
