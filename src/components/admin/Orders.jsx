import React, { useState, useEffect } from 'react';
import { getAllOrders } from '../../firebase';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const fetchedOrders = await getAllOrders();
      setOrders(fetchedOrders);
    }

    fetchOrders();
  }, []);

  const toggleOrderExpansion = (orderId) => {
    if (expandedOrders.includes(orderId)) {
      setExpandedOrders((prev) => prev.filter((id) => id !== orderId));
    } else {
      setExpandedOrders((prev) => [...prev, orderId]);
    }
  };

  return (
    <div className='p-5 space-y-4 mt-28'>
      {orders.map((order) => (
        <div key={order.id} className='border rounded-lg p-4 space-y-4'>
          <h1
            onClick={() => toggleOrderExpansion(order.id)}
            className='text-xl font-semibold cursor-pointer'
          >
            Order: {order.StripeSessionId} - click to open/close details
          </h1>

          {expandedOrders.includes(order.id) && (
            <>
              <div>
                <h2 className='text-lg font-medium'>Payment:</h2>
                <p>Payment Status: {order.payment}</p>
                <p>Total Price: {order.total}</p>
              </div>
              <div>
                <h2 className='text-lg font-medium'>Shipping Details:</h2>
                <p>
                  {order.shippingDetails.firstName}{' '}
                  {order.shippingDetails.lastName}
                </p>
                <p>{order.shippingDetails.addressLine1}</p>
                <p>
                  {order.shippingDetails.city}, {order.shippingDetails.postcode}
                  , {order.shippingDetails.country}
                </p>
                <p>Email: {order.shippingDetails.email}</p>
                <p>Phone: {order.shippingDetails.phoneNumber}</p>
              </div>
              <div>
                <h2 className='text-lg font-medium'>Cart Items:</h2>
                <ul className='space-y-3'>
                  {order.cartItems.map((item) => (
                    <li key={item.id} className='flex items-center space-x-3'>
                      <img
                        src={item.mainImage}
                        alt={item.title}
                        className='w-20 h-20 object-cover rounded'
                      />
                      <div>
                        <p className='font-medium'>{item.title}</p>
                        <p>
                          {item.price} {item.currency}
                        </p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Orders;
