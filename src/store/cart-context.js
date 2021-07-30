import React  from 'react';
//Define the context with inital empty value
const CartContext = React.createContext({
    items:[],
    totalAmount:0,
    addItem:(item) => {},
    removeItem:(id)=>{},
});

export default CartContext;