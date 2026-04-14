
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: []
    },
    reducers: {
        addToCart(state, action) {
            const { id, quantity = 1 } = action.payload;
            console.log(action, action.payload);

            const item = state.value.find(prod => prod.id === id);
            if (item) {
                item.quantity += 1;


            } else {
                state.value.push({ ...action.payload, quantity });

            }
        },
        removeFromcart(state, action) {
            console.log(action.payload, action);
            const { id, quantity } = action.payload;
            const index = state.value.findIndex(prod => prod.id === id);
            if (index !== -1) {
                const item = state.value[index];
                item.quantity -= 1;

                if (item.quantity === 0) {
                    state.value.splice(index, 1);
                }
            }


        }

    }
})

export const { addToCart, removeFromcart } = cartSlice.actions;
export default cartSlice.reducer;