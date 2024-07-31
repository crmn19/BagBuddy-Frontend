import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../reducers/cartReduce";
import shippingReducer from "../reducers/shippingReducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  cart: cartReducer,
  shipping: shippingReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});

export default store;
