import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions";

const initialState = {
  cart: 0, // Numero di articoli nel carrello
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: state.cart + 1, // Incrementa il numero di articoli nel carrello
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart > 0 ? state.cart - 1 : 0, // Decrementa il numero di articoli se maggiore di zero
      };
    default:
      return state;
  }
};
