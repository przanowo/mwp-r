import React, { useState, useContext, useEffect } from 'react'; // import useContext
import { CartContext } from './CartContext';
import {
  addProductToUserCollection,
  removeProductFromUserCollection,
  fetchUserCart,
  decreaseProductQuantityInFirestore,
  increaseProductQuantityInFirestore,
  // getTotalPrice,
} from '../firebase';
import AuthContext from './AuthContext'; // import AuthContext

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext); // get the user object from AuthContext

  useEffect(() => {
    if (user) {
      console.log(user);
      // Fetch cart items when user logs in or app initializes
      fetchUserCart(user.uid)
        .then((fetchedCart) => setCart(fetchedCart))
        .catch((error) => console.error('Failed to fetch cart:', error));
    } else {
      setCart([]);
    }
  }, [user]); // The useEffect depends on the `user`, so it runs every time `user` changes

  const addToCart = async (product, productId) => {
    const productToAdd = { ...product, quantity: 1 };
    if (user) {
      await addProductToUserCollection(user.uid, productId, productToAdd);

      // Refresh cart from Firestore after updating.
      const updatedCart = await fetchUserCart(user.uid);
      setCart(updatedCart);
    } else {
      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === product.id);

        if (existingProduct) {
          // If the product exists, map through the cart and update its quantity
          return prevCart.map((item) => {
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
    // Update the local cart state by filtering out the product with the given productId
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

    // If a user is logged in, remove the product from the user's Firestore cart collection
    if (user) {
      await removeProductFromUserCollection(user.uid, productId);
    }
  };

  const increaseQuantity = async (productId) => {
    if (user) {
      await increaseProductQuantityInFirestore(user.uid, productId);
      const updatedCart = await fetchUserCart(user.uid);
      setCart(updatedCart);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) => {
          if (item.id === productId) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        })
      );
    }
  };

  const decreaseQuantity = async (productId) => {
    if (user) {
      await decreaseProductQuantityInFirestore(user.uid, productId);
      const updatedCart = await fetchUserCart(user.uid);
      setCart(updatedCart);
    } else {
      setCart((prevCart) =>
        prevCart
          .map((item) => {
            if (item.id === productId && item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            } else if (item.id === productId && item.quantity <= 1) {
              return null;
            }
            return item;
          })
          .filter((item) => item !== null)
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const clearCart = async () => {
    // Clear the local cart state

    // If a user is logged in, remove all items from the user's Firestore cart collection
    if (user) {
      const userCartItems = await fetchUserCart(user.uid);
      for (const item of userCartItems) {
        await removeProductFromUserCollection(user.uid, item.id);
      }
    }
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getTotalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
