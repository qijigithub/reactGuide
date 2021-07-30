import React, { useReducer } from 'react';
import Card from '../components/UI/Card';
import CartContext from './cart-context';

const defaultCartState = {
    items:[],
    totalAmount:0,
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {


        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
        if(existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount:existingCartItem.amount + action.item.amount,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } 
        else {
            updatedItems = state.items.concat(action.item);
        }

        // const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount,
        }
    }
    if(action.type === 'REMOVE') {

    }
    return defaultCartState;
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD', item: item})
    };
    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE', id: id})
    }
    // Initial value to real number and function
    const cartContext = {
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem:removeItemFromCartHandler,
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider
