import { createSlice } from "@reduxjs/toolkit";
import { getProductByCart } from "../../actions/cart/cart";

const slice = createSlice({
    name: 'cart',
    initialState: {
        cartProductList: [],
        isLoading: false,
    },
    reducers: {
        clearCart: (state) => {
            state.cartProductList = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductByCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductByCart.fulfilled, (state, action) => {
                state.cartProductList = action.payload.data;
                state.isLoading = false;
            })
            .addCase(getProductByCart.rejected, (state) => {
                state.isLoading = false;
                state.cartProductList = [];
            });
    }
});

export const { clearCart } = slice.actions;

export default slice.reducer;