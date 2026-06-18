import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        value: []
    },
    reducers: {
        toggleWishlist(state, action) {
            const { id } = action.payload;
            const exists = state.value.find((prod) => prod.id === id);
            if (exists) {
                //remove from cart logic
                const index = state.value.findIndex((prod) => prod.id === id);
                if (index != -1) {
                    state.value.splice(index, 1)
                }
            } else {
                //add to wishlist
                const product = state.value.find((prod) => prod.id === id)
                state.value.push({ ...action.payload });
            }
        }
    }
})

export const {toggleWishlist}=wishlistSlice.actions;
export default wishlistSlice.reducer;
