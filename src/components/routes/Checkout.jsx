import React from 'react'
import Cart from '../product/Cart'
import ShippingDetails from '../product/ShippingDetails'

const Checkout = () => {
  return (

    <div className='mt-24'>
      <div>
        <Cart />
      </div>
      <div>
        <ShippingDetails />
      </div>
    </div>

  )
}

export default Checkout