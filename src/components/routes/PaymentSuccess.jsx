import React, { useContext, useEffect } from 'react';
import { updateOrderPaymentStatus } from '../../firebase';
import AuthContext from '../../hooks/AuthContext';
import { CartContext } from '../../hooks/CartContext';

function PaymentSuccess() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('order');
  const { user } = useContext(AuthContext);
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    if (user && sessionId) {
      const handlePaymentSuccess = async () => {
        try {
          const paymentStatus = 'success';

          // Create order
          await updateOrderPaymentStatus(user.uid, sessionId, paymentStatus);

          // Clear the user's cart
          await clearCart(user.uid);
        } catch (error) {
          console.error('Error handling payment success:', error);
          // Handle this error gracefully. Maybe show a message to the user.
        }
      };

      handlePaymentSuccess();
    }
  }, [user, sessionId]);

  return (
    <div
      className='h-screen w-screen flex justify-center items-center bg-cover bg-center'
      style={{
        backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Floginbg.jpg?alt=media&token=97fc37ac-11a2-47fb-af77-462cc4a0d077")`,
      }}
    >
      <div className='flex flex-col bg-gray-300/50 rounded-lg p-16 w-1/2'>
        <h2 className='text-3xl text-white font-bold p-4 text-center'>
          Payment Successful!
        </h2>
        <p className='text-white text-lg mt-4'>
          Your payment session ID: {sessionId}
        </p>
        {/* Render other relevant information here */}
      </div>
    </div>
  );
}

export default PaymentSuccess;

// import React from 'react';

// function PaymentSuccess() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const sessionId = urlParams.get('order');

//   // TODO: Handle fetching and displaying relevant payment details using the sessionId

//   return (
//     <div
//       className='h-screen w-screen flex justify-center items-center bg-cover bg-center'
//       style={{
//         backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Floginbg.jpg?alt=media&token=97fc37ac-11a2-47fb-af77-462cc4a0d077")`,
//       }}
//     >
//       <div className='flex flex-col bg-gray-300/50 rounded-lg p-16 w-1/2'>
//         <h2 className='text-3xl text-white font-bold p-4 text-center'>
//           Payment Successful!
//         </h2>
//         <p className='text-white text-lg mt-4'>
//           Your payment session ID: {sessionId}
//         </p>
//         {/* Render other relevant information here */}
//       </div>
//     </div>
//   );
// }

// export default PaymentSuccess;
