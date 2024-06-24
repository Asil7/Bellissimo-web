import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategoryEnums = createAsyncThunk(
    'category/enums',
    async (thunkAPI) => {
        try {
            const res = await axios.get('http://localhost:8080/api/product/category');
            return res.data;
        } catch (e) {
            console.log(e, thunkAPI);
        }
    }
)