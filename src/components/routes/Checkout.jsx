import React, { useState } from 'react';
import Cart from '../product/Cart';
import ShippingDetails from '../product/ShippingDetails';
// import PaymentForm from '../product/PaymentForm';
import { SlArrowDown } from 'react-icons/sl';
import Footer from '../common/Footer';
import { getCheckoutUrl } from '../../firebase';

const Checkout = () => {
  const [cartExpanded, setCartExpanded] = useState(true);
  const [shippingExpanded, setShippingExpanded] = useState(false);
  const [paymentExpanded, setPaymentExpanded] = useState(false);

  const handleCartExpand = () => {
    setCartExpanded(true);
    setShippingExpanded(false);
    setPaymentExpanded(false);
  };

  const handleShippingExpand = () => {
    setCartExpanded(false);
    setShippingExpanded(true);
    setPaymentExpanded(false);
  };

  // const handlePaymentExpand = () => {
  //   setCartExpanded(false);
  //   setShippingExpanded(false);
  //   setPaymentExpanded(true);
  // };

  const processPayment = async () => {
    try {
      const checkoutUrl = await getCheckoutUrl('YOUR_PRICE_ID_HERE'); // replace 'YOUR_PRICE_ID_HERE' with the actual price ID.
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error processing payment:', error);
    }
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
      <div
        className='flex max-w-4xl justify-center items-center mx-auto text-xl font-semibold rounded bg-gray-200/50 my-4'
        onClick={handleShippingExpand}
      >
        {!shippingExpanded && (
          <button className='flex items-center p-3 text-3xl'>
            Add Shipping Address
          </button>
        )}
        <button className={`p-4 ${shippingExpanded ? 'hidden' : ''}`}>
          <SlArrowDown />
        </button>
        {shippingExpanded && <ShippingDetails />}
      </div>
      <div className='flex max-w-4xl justify-center items-center mx-auto text-xl font-semibold rounded bg-gray-200/50 my-4 '>
        {!paymentExpanded && (
          <button
            onClick={processPayment} // Here is the modification
            className='flex items-center p-3 text-3xl'
          >
            Process Payment
          </button>
        )}
      </div>

      {/* <div className='flex max-w-4xl justify-center items-center mx-auto text-xl font-semibold rounded bg-gray-200/50 my-4'>
        {!paymentExpanded && (
          <button
            onClick={handlePaymentExpand}
            className='flex items-center p-3 text-3xl'
          >
            Process Payment
          </button>
        )}
        {paymentExpanded && <PaymentForm />}
        <button className={`p-4 ${paymentExpanded ? 'hidden' : ''}`}>
          <SlArrowDown />
        </button>
      </div> */}
      <div className=''>
        <Footer />
      </div>
    </div>
  );
};

export default Checkout;
