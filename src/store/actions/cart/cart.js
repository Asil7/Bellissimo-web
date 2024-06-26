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

export const getProductCountFromCart = createAsyncThunk(
    'get/productCount',
    async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/cart/count`);
            return res
        } catch (e) {
            return e
        }
    }
)

export const updateQuantity = createAsyncThunk(
    'update/quantity',
    async (data) => {
        const {url, id, quantity} = data;
        try {
            const res = await axios.put(`http://localhost:8080/api/cart/${url}/${id}/${quantity}`);
            return res
        } catch (e) {
            return e
        }
    }
)