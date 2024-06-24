import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProductToCart = createAsyncThunk(
    'add/productToCart',
    async (data) => {
        try {
            const res = await axios.post('http://localhost:8080/api/cart', data);
            return res;
        } catch (e) {
            return e
        }
    }
)

export const getProductByCart = createAsyncThunk(
    'get/productByCart',
    async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/cart`);
            return res
        } catch (e) {
            return e
        }
    }
)