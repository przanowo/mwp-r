import React from 'react';

function PaymentFailed() {
  // TODO: Handle fetching and displaying relevant payment details using the sessionId

  return (
    <div
      className='h-screen w-screen flex justify-center items-center bg-cover bg-center'
      style={{
        backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Floginbg.jpg?alt=media&token=97fc37ac-11a2-47fb-af77-462cc4a0d077")`,
      }}
    >
      <div className='flex flex-col bg-gray-300/50 rounded-lg p-16 w-1/2'>
        <h2 className='text-3xl text-white font-bold p-4 text-center'>
          Payment Failed!
        </h2>
        <p className='text-white text-lg mt-4'>
          Please try again, or contact us.
        </p>
        {/* Render other relevant information here */}
      </div>
    </div>
  );
}

export default PaymentFailed;
