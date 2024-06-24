import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import enums from "./slice/enums/enums";
import product from "./slice/product/product";
import cart from "./slice/cart/cart";

export const throwMiddleware = () => (next) => (action) => {
    next(action);
    if (action?.error) throw action.error;
};

const reducer = combineReducers({
    enums,
    product,
    cart
});

export default configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(throwMiddleware)
});