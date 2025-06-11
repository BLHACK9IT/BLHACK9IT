import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, type) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const quantity = type === 'inc' ? item.quantity + 1 : Math.max(1, item.quantity - 1);
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
