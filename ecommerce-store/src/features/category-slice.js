
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCategoryList = createAsyncThunk(
    "categories/getCategoryList", async () => {
        const response = await fetch('https://dummyjson.com/products/category-list');
        const result = await response.json();
        // console.log("categories",result)
        return result;
    }

)

const categorieslice = createSlice({
    name: "categories",
    initialState: {
        value: []
    },
    extraReducers: (builder) => {
        builder.addCase(getCategoryList.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCategoryList.fulfilled, (state, action) => {
            state.loading = false;
            state.value = action.payload;
        });
        builder.addCase(getCategoryList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;

        })
    }
})

export default categorieslice.reducer;