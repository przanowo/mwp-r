import React, { useState } from 'react';
import { createOrderFromCheckout } from '../../firebase';

const ShippingDetails = () => {
  const [formData, setFormData] = useState({
    addressLine1: '',
    addressLine2: '',
    county: '',
    city: '',
    postcode: '',
    country: '',
    phoneNumber: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrderFromCheckout(formData);
      console.log("Document added successfully")
    } catch (error) {
      console.error("Error adding note: ", error.message);
  }

    // Reset the form fields
    setFormData({
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
    <div className='flex p-6 w-full'>
      <h2 className='text-center text-4xl p-4'>Shipping Details</h2>
      <form onSubmit={handleSubmit} className='w-full'>
        <div className='flex flex-col p-1 '>
          <label>Address Line 1: </label>
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            className='border-solid border-2 border-black/25 bg-white/25 w-full'
            required
          />
        </div>
        <div className='flex flex-col p-1' >
          <label>Address Line 2: </label>
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            className='border-solid border-2 border-black/25 bg-white/25'
          />
        </div>
        <div className='flex flex-col p-1' >
          <label>County</label>
          <input
            type="text"
            name="county"
            value={formData.county}
            onChange={handleChange}
            className='border-solid border-2 border-black/25 bg-white/25'
          />
        </div>
        <div className='flex flex-col p-1'>
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className='border-solid border-2 border-black/25 bg-white/25'
            required
          />
        </div>
        <div className='flex flex-col p-1'>
          <label>Postcode</label>
          <input
            type="text"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            className='border-solid border-2 border-black/25 bg-white/25'
            required
          />
        </div>
        <div className='flex flex-col p-1' >
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className='border-solid border-2 border-black/25 bg-white/25'
            required
          />
        </div>
        <div className='flex flex-col p-1'>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className='border-solid border-2 border-black/25 bg-white/25'
            required
          />
        </div>
        <div className='flex flex-col p-1'>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className='border-solid border-2 border-black/25 bg-white/25'
            required
          />
        </div>
        <div className="flex justify-center p-2">
          <button type="submit" className='border-black border-2 p-2 rounded-lg hover:bg-gray-600/50 text-2xl'>Submit Shipping Details</button>
        </div>
      </form>
    </div>
  );
};

export default ShippingDetails;
