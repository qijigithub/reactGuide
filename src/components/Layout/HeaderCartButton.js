import React,{ useContext, useEffect,useState } from 'react';
import CartIcon from '../Carts/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnHighlighted] =  useState(false);
    const cartCtx = useContext(CartContext);
    console.log('itme:',cartCtx.items);
    const numberOfCartItems= cartCtx.items.reduce((curNumber, item)=>{
        return curNumber + item.amount;
    }, 0);
     const { items }= cartCtx;

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(()=>{
        if(cartCtx.items.length === 0) {
            return;
        }
        setBtnHighlighted(true);
        const timer = setTimeout(()=>{
            setBtnHighlighted(false);
        }, 300);
        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon /> 
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton
