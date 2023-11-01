import React, { useContext, useRef, useState } from 'react';
import Cart from '../product/Cart';
import { SlArrowDown } from 'react-icons/sl';
import Footer from '../common/Footer';
import { createStripeCheckoutSession, saveOrderDetails } from '../../firebase';
import { CartContext } from '../../hooks/CartContext';
import AuthContext from '../../hooks/AuthContext';

const Checkout = () => {
  const [cartExpanded, setCartExpanded] = useState(true);
  const [shippingExpanded, setShippingExpanded] = useState(false);
  const { getTotalPrice, cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const totalPrice = getTotalPrice();
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    county: '',
    city: '',
    postcode: '',
    country: '',
    phoneNumber: '',
    email: '',
  });

  const handleCartExpand = () => {
    setCartExpanded(true);
    setShippingExpanded(false);
  };

  const handleShippingExpand = () => {
    setShippingExpanded(true);
    setCartExpanded(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const processPayment = async (e) => {
    e.preventDefault();

    if (!formRef.current?.checkValidity()) {
      alert('Please fill in all the required fields.');
      return;
    }

    try {
      const cartItems = cart;
      const shippingDetails = formData;
      const paymentStatus = 'pending';

      let sessionId;
      try {
        sessionId = await createStripeCheckoutSession(totalPrice);
      } catch (error) {
        throw new Error(
          'Failed to create Stripe checkout session: ' + error.message
        );
      }

      try {
        await saveOrderDetails(
          cartItems,
          shippingDetails,
          user.uid,
          paymentStatus,
          sessionId,
          totalPrice
        );
      } catch (error) {
        throw new Error('Failed to save order details: ' + error.message);
      }

      try {
        const stripe = window.Stripe(
          'pk_test_51MhsHfBhAs9urMNozOuHDQ4iyRvumObUZSgpT7WGzUT3i0MNqAXllPNzZPgvPJayIY7CzA7Tn5ja3o2BwyuJXaTd00Ylgp0NKz'
        );
        stripe.redirectToCheckout({ sessionId });
      } catch (error) {
        throw new Error(
          'Failed to redirect to Stripe checkout: ' + error.message
        );
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }

    setFormData({
      firstName: '',
      lastName: '',
      addressLine1: '',
      addressLine2: '',
      county: '',
      city: '',
      postcode: '',
      country: '',
      phoneNumber: '',
      email: '',
    });
  };

  return (
    <div
      className='flex-col bg-cover bg-center min-h-screen justify-between'
      style={{
        backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2FcheckoutBG.jpg?alt=media&token=ca190154-dda4-4d8d-9344-e9b05f3cd370s")`,
      }}
    >
      <div className='flex mt-28 max-w-4xl justify-center items-center mx-auto text-xl font-semibold rounded bg-gray-200/50 my-4'>
        {!cartExpanded && (
          <button
            className='flex items-center p-3 text-3xl'
            onClick={handleCartExpand}
          >
            Show Cart
          </button>
        )}
        {cartExpanded && <Cart />}
        <button className={`p-4 ${cartExpanded ? 'hidden' : ''}`}>
          <SlArrowDown />
        </button>
      </div>
      {cart.length > 0 && (
        <div
          className='flex max-w-4xl justify-center items-center mx-auto text-xl font-semibold rounded bg-gray-200/50 my-4'
          onClick={handleShippingExpand}
        >
          {!shippingExpanded && (
            <button className='flex items-center p-3 text-3xl'>
              Process Payment
            </button>
          )}
          <button className={`p-4 ${shippingExpanded ? 'hidden' : ''}`}>
            <SlArrowDown />
          </button>
          {shippingExpanded && (
            <div className='flex p-6 w-full'>
              <form className='w-full' ref={formRef}>
                <h2 className='text-center text-4xl p-4'>Shipping Details</h2>
                <div className='flex flex-col p-1'>
                  <label>First Name: </label>
                  <input
                    type='text'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    className='border-solid border-2 border-black/25 bg-white/25'
                    required
                  />
                </div>
                <div className='flex flex-col p-1'>
                  <label>Last Name: </label>
                  <input
                    type='text'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                    className='border-solid border-2 border-black/25 bg-white/25'
                    required
                  />
                </div>
                <div className='flex flex-col p-1 '>
                  <label>Address Line 1: </label>
                  <input
                    type='text'
                    name='addressLine1'
                    value={formData.addressLine1}
                    onChange={handleChange}
                    className='border-solid border-2 border-black/25 bg-white/25 w-full'
                    required
                  />
                </div>
                <div className='flex flex-col p-1'>
                  <label>Address Line 2: </label>
                  <input
                    type='text'
                    name='addressLine2'
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className='border-solid border-2 border-black/25 bg-white/25'
                  />
                </div>
                <div className='flex flex-col p-1'>
                  <label>County</label>
                  <input
                    type='text'
                    name='county'
                    value={formData.county}
                    onChange={handleChange}
                    className='border-solid border-2 border-black/25 bg-white/25'
                  />
                </div>
                <div className='flex flex-col p-1'>
                  <label>City</label>
                  <input
                    type='text'
                    name='city'
                    value={formData.city}
                    onChange={handleChange}
                    className='border-solid border-2 border-black/25 bg-white/25'
                    required
                  />
                </div>
                <div className='flex flex-col p-1'>
                  <label>Postcode</label>
                  <input
                    type='text'
                    name='postcode'
                    value={formData.postcode}
                    onChange={handleChange}
                    className='border-solid border-2 border-black/25 bg-white/25'
                    required
                  />
                </div>
                <div className='flex flex-col p-1'>
                  <label>Country</label>
                  <input
                    type='text'
                    name='country'
                    value={formData.country}
                    onChange={handleChange}
                    className='border-solid border-2 border-black/25 bg-white/25'
                    required
                  />
                </div>
                <div className='flex flex-col p-1'>
                  <label>Phone Number</label>
                  <input
                    type='text'
                    name='phoneNumber'
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className='border-solid border-2 border-black/25 bg-white/25'
                    required
                  />
                </div>
                <div className='flex flex-col p-1'>
                  <label>Email</label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='border-solid border-2 border-black/25 bg-white/25'
                    required
                  />
                </div>
                <div className='flex justify-center p-2'>
                  <button
                    onClick={processPayment}
                    className='border-black border-2 p-2 rounded-lg hover:bg-gray-600/50 text-2xl'
                  >
                    Process Payment
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      <div className='hidden lg:block'>
        <Footer />
      </div>
    </div>
  );
};

export default Checkout;
