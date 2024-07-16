import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/cart-slice";
import modalReducer from "../store/modal-slice";

const store = configureStore({
  reducer: { cart: cartReducer, modal: modalReducer },
});

export default store;
