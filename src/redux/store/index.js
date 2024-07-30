import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../reducers/cartReduce";
import shippingReducer from "../reducers/shippingReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  shipping: shippingReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
