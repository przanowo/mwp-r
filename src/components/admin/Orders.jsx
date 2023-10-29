import React, { useState, useEffect } from 'react';
import { fetchOrdersFromFirestore } from '../../firebase';

function Orders() {
  const [orders, setOrders] = useState(null);
  console.log(orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersd = await fetchOrdersFromFirestore();
        setOrders(ordersd);
      } catch (error) {}
    };

    fetchOrders();
  }, []);

  if (!orders) return <div>Loading...</div>;

  return (
    <div className='p-4 bg-gray-100 rounded shadow-lg'>
      {/* <h2 className='text-xl font-bold mb-4'>Order Details</h2>
      <p>
        <strong>Session ID:</strong> {orders.sessionId}
      </p>

      <div className='my-4'>
        <h3 className='text-lg font-semibold'>User Details:</h3>
        <p>{orders.userDetails}</p>
      </div>

      <div className='my-4'>
        <h3 className='text-lg font-semibold'>Cart Items:</h3>
        <ul>
          {orders.map((item) => (
            <li key={item.id} className='mb-2'>
              {item.title} (Size: {item.size}, Magazine: {item.magazine}) -{' '}
              {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
      </div>

      <div className='my-4'>
        <h3 className='text-lg font-semibold'>Shipping Details:</h3>
        <p>
          Name: {orders.shippingDetails.firstName}{' '}
          {orders.shippingDetails.lastName}
        </p>
        <p>Email: {orders.shippingDetails.email}</p>
        <p>Phone: {orders.shippingDetails.phoneNumber}</p>
        <p>
          Address: {orders.shippingDetails.addressLine1},{' '}
          {orders.shippingDetails.addressLine2}, {orders.shippingDetails.county}
          , {orders.shippingDetails.city}, {orders.shippingDetails.postcode},{' '}
          {orders.shippingDetails.country}
        </p>
      </div>

      <div className='my-4'>
        <h3 className='text-lg font-semibold'>Payment:</h3>
        <p>{orders.payment}</p>
      </div> */}
    </div>
  );
}

export default Orders;
