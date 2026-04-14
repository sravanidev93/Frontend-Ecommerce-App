
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
    "products/getProducts", async () => {
        const response = await fetch('https://dummyjson.com/products?limit=0');
        const result = await response.json();
        return result.products;
    }

)

const productSlice = createSlice({
    name: "products",
    initialState: {
        value: []
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.value = action.payload;
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;

        })
    }
})

export default productSlice.reducer;