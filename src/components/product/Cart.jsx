import React, { useContext } from 'react';
import { CartContext } from '../../hooks/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className='flex flex-grow justify-center'>Your cart is empty.</div>
    );
  }

  return (
    <div className='flex flex-col flex-grow bg-gray-200/50 p-8 rounded-md shadow-md w-full max-w-4xl mx-auto'>
      <div className='flex justify-center'>
        <h2 className='flex text-3xl font-bold mb-6'>Your Cart</h2>
      </div>
      <div>
        <ul>
          {cart.map((product) => (
            <li key={product.id} className='mb-4 border-b pb-4 last:border-b-0'>
              <div className='flex justify-between items-center'>
                <div className='max-w-xl mr-4'>
                  <Link to={`/shop/${product.id}`}>
                    <img
                      src={product.mainImage}
                      alt={product.title}
                      className='object-cover h-32 w-full rounded-md shadow-md'
                    />
                  </Link>
                </div>
                <div className='flex-1'>
                  <Link to={`/shop/${product.id}`}>
                    <h3 className='text-lg font-semibold'>{product.title}</h3>
                    <p className='text-xl font-bold mt-2'>${product.price}</p>
                    <p className='text-gray-600'>
                      Quantity: {product.quantity}
                    </p>
                  </Link>
                </div>

                <div className='flex items-center'>
                  <button
                    onClick={() => increaseQuantity(product.id)}
                    className='bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded-full shadow-md mr-2'
                  >
                    +
                  </button>
                  <button
                    onClick={() => decreaseQuantity(product.id)}
                    disabled={product.quantity <= 1}
                    className={`px-3 py-1 rounded-full shadow-md ${
                      product.quantity <= 1
                        ? 'bg-gray-200/25 cursor-not-allowed'
                        : 'bg-gray-400 hover:bg-gray-500 text-white'
                    }`}
                  >
                    -
                  </button>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className='ml-2 bg-red-300 hover:bg-red-400 text-white px-4 py-1 rounded-full shadow-md'
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='mt-6'>
        <strong className='text-xl font-semibold'>Total: </strong>
        <span className='text-xl'>
          $
          {cart
            .reduce((acc, product) => acc + product.price * product.quantity, 0)
            .toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default Cart;
