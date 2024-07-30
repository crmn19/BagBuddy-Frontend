// reducers/shippingReducer.js
const initialState = {
  metodoSpedizione: "standard", // Default value
};

const shippingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_METODO_SPEDIZIONE":
      return {
        ...state,
        metodoSpedizione: action.payload,
      };
    default:
      return state;
  }
};

export default shippingReducer;
