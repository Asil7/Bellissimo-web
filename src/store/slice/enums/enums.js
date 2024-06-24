import { createSlice } from "@reduxjs/toolkit";
import { fetchCategoryEnums } from "../../actions/enums/enums";

const slice = createSlice({
    name: 'enums',
    initialState: {
        categoryEnums: [],
        isLoading: false,
    },
    reducers: {
        clearEnums: (state) => {
            state.enum = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoryEnums.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCategoryEnums.fulfilled, (state, action) => {
                state.categoryEnums = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchCategoryEnums.rejected, (state) => {
                state.isLoading = false;
                state.categoryEnums = [];
            });
    }
});

export const {clearEnums} = slice.actions;

export default slice.reducer;