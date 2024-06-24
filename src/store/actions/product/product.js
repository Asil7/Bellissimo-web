import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createProduct = createAsyncThunk(
    'create/product',
    async (data) => {
        try {
            const res = await axios.post('http://localhost:8080/api/product', data);
            return res;
        } catch (e) {
            return e
        }
    }
)

export const getProductByCategory = createAsyncThunk(
    'get/product',
    async (category) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/product/category/${category}`);
            return res
        } catch (e) {
            return e
        }
    }
)