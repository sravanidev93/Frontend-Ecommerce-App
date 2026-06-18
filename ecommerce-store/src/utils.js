

export function getCartItemsCount(cartItems) {
    const result=cartItems.reduce((total, curr) => total + (curr.quantity), 0)
    return result;
}

export function getWishlistItemsCount(wishlistItems){
    const productCount=wishlistItems.reduce((count,item)=>count+1,0);
    return productCount;
}

export function getSubTotal(cart,id){
    const prod=cart.find(item=>item.id===id);
    const result=prod.quantity*prod.price;
    return result.toFixed(2);
}

export function getTotalAmount(cartItems){
    const total=cartItems.reduce((total,item)=>
        (item.quantity*item.price)+total
    ,0);
    // console.log(total.toFixed(2));
    return total.toFixed(2);
}

export const formatIndianRupee=(amount)=> new Intl.NumberFormat("en-IN",
                                {style:"currency",
                                currency:"INR"}).format(amount);
