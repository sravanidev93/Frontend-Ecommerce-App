
import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./features/cart-slice";
import productReducer from "./features/product-slice";
import categoryReducer from "./features/category-slice";
export const store=configureStore({
    reducer:{
        cart:cartReducer,
        products:productReducer,
        categories:categoryReducer
    }
});

