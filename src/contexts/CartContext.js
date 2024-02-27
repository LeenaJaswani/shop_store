import React, { createContext, useReducer } from "react";

import { CartReducer } from "./CartReducer";

export const CartContext = createContext();

const Storage =  localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

const initialState = { cartItems: Storage}

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);
  const placeOrder = () => {
   
    const orderId = Date.now(); 
    const order = { id: orderId, items: [...state.getCartItems], date: new Date().toISOString() };
    
    let currentOrders = JSON.parse(localStorage.getItem('orders')) || [];
    currentOrders.push(order);
    
    localStorage.setItem('orders', JSON.stringify(currentOrders));
    
   
    dispatch({ type: 'CLEAR' });
  };
  
  const addProduct = payload => {
    dispatch({ type: 'ADD', payload });
    return state.cartItems;
  }

  const removeProduct = payload =>
  {
    dispatch({ type: 'REMOVE', payload });
    return state.cartItems;
  }

  const increaseQuantity = payload => 
  {
    dispatch({ type: 'INCQTY', payload });
    return state.cartItems;
  }

  const decreaseQuantity = payload => 
  {
    dispatch({ type: 'DECQTY', payload });
    return state.cartItems;
  }

  const clearCart= () => {
    dispatch({ type: 'CLEAR', payload: undefined });
    return state.cartItems;
  }

  const getCartItems = () => {
    return state.cartItems;
  }

  const contextValues = {
    addProduct,
    removeProduct,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getCartItems,
    placeOrder,
    ...state
  }

  return (
    <CartContext.Provider value={contextValues} >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider;