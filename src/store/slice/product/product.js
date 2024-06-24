import { createSlice } from "@reduxjs/toolkit";
import { getProductByCategory } from "../../actions/product/product";

const slice = createSlice({
    name: 'product',
    initialState: {
        pizzaList: [],
        snackList: [],
        drinkList: [],
        dessertList: [],
        saladList: [],
        sauceList: [],
        isLoading: false,
    },
    reducers: {
        clearProduct: (state) => {
            state.pizzaList = [];
            state.snackList = [];
            state.drinkList = [];
            state.dessertList = [];
            state.saladList = [];
            state.sauceList = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductByCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductByCategory.fulfilled, (state, action) => {
                const category = action.meta.arg;
                if (category === 'PIZZA') {
                    state.pizzaList = action.payload.data;
                } else if (category === 'SNACK') {
                    state.snackList = action.payload.data;
                } else if (category === 'DRINK') {
                    state.drinkList = action.payload.data;
                } else if (category === 'DESSERT') {
                    state.dessertList = action.payload.data;
                } else if (category === 'SALAD') {
                    state.saladList = action.payload.data;
                } else if (category === 'SAUCE') {
                    state.sauceList = action.payload.data;
                }
                state.isLoading = false;
            })
            .addCase(getProductByCategory.rejected, (state) => {
                state.isLoading = false;
                state.productList = [];
            });
    }
});

export const { clearProduct } = slice.actions;

export default slice.reducer;