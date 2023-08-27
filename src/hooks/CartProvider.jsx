import React, { useState, useContext, useEffect } from 'react'; // import useContext
import { CartContext } from './CartContext';
import { addProductToUserCollection, removeProductFromUserCollection, fetchUserCart, decreaseProductQuantityInFirestore, increaseProductQuantityInFirestore } from '../firebase';
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
    console.log(product,);
    // If the product doesn't have a quantity attribute, create a copy with a quantity of 1.
    if (!product.quantity) {
        productToAdd = { ...product, quantity: 1 };
    }


    if (user) {
      await addProductToUserCollection(user.uid, product.id, productToAdd);
      
      // Refresh cart from Firestore after updating.
      const updatedCart = await fetchUserCart(user.uid);
      setCart(updatedCart);
  } else {
      setCart((prevCart) => {
        const existingProduct = prevCart.find(item => item.id === product.id);

        if (existingProduct) {
            // If the product exists, map through the cart and update its quantity
            return prevCart.map(item => {
                if (item.id === product.id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
        } else {
            // If the product does not exist, add it to the cart
            return [...prevCart, productToAdd];
        }
    });
  }

};


  const removeFromCart = async (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    
    if (user) {
      await removeProductFromUserCollection(user.uid, productId); // use user.uid
    }
  };

  const increaseQuantity = async (productId) => {
    if (user) {
      await increaseProductQuantityInFirestore(user.uid, productId);
      const updatedCart = await fetchUserCart(user.uid);
      setCart(updatedCart);
    } else {
      setCart((prevCart) => prevCart.map(item => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      }));
    }
  };

  const decreaseQuantity = async (productId) => {
    if (user) {
      await decreaseProductQuantityInFirestore(user.uid, productId);
      const updatedCart = await fetchUserCart(user.uid);
      setCart(updatedCart);
    } else {
      setCart((prevCart) => prevCart.map(item => {
        if (item.id === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else if (item.id === productId && item.quantity <= 1) {
          return null;
        }
        return item;
      }).filter(item => item !== null));
    }
  };


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
