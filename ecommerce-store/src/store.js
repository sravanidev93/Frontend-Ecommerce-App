
import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./features/cart-slice";
import productReducer from "./features/product-slice";
import categoryReducer from "./features/category-slice";
import wishlistReducer from "./features/wishlist-slice";
import checkoutReducer from './features/checkout.slice';
export const store=configureStore({
    reducer:{
        cart:cartReducer,
        products:productReducer,
        categories:categoryReducer,
        wishlist:wishlistReducer,
        checkout:checkoutReducer
    }
});

