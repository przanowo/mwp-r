import React, { useState, useContext, useEffect } from 'react'; // import useContext
import { CartContext } from './CartContext';
import { addProductToUserCollection, removeProductFromUserCollection, fetchUserCart } from '../firebase';
import AuthContext from './AuthContext'; // import AuthContext

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext); // get the user object from AuthContext
  
  useEffect(() => {
    if (user) {
      // Fetch cart items when user logs in or app initializes
      fetchUserCart(user.uid)
        .then(fetchedCart => setCart(fetchedCart))
        .catch(error => console.error("Failed to fetch cart:", error));
    }
  }, [user]);  // The useEffect depends on the `user`, so it runs every time `user` changes


  const addToCart = async (product, category, productId) => {
    let productToAdd = product;
    // console.log(product, productId, product);
    // If the product doesn't have a quantity attribute, create a copy with a quantity of 1.
    if (!product.quantity) {
        productToAdd = { ...product, quantity: 1 };
    }

    setCart((prevCart) => {
        // Find the index of the product if it exists in the cart
        const productIndex = prevCart.findIndex(item => item.id === productId);
        // console.log(productId);

        if (productIndex !== -1) {
            // Product already exists in the cart, so we update its quantity
            const newCart = [...prevCart];
            newCart[productIndex].quantity += 1;
            return newCart;
        } else {
            // Product doesn't exist in the cart, so we add it with a quantity of 1
            return [...prevCart, productToAdd];
        }
    });

    if (user) {
        await addProductToUserCollection(user.uid, productId, productToAdd); // use user.uid
    }
};


  const removeFromCart = async (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    
    if (user) {
      await removeProductFromUserCollection(user.uid, productId); // use user.uid
    }
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) => prevCart.map(item => {
      if(item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    }));
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) => prevCart.map(item => {
      if(item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
