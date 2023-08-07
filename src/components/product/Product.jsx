import React from 'react';
import { useParams } from 'react-router-dom';
import data from '../routes/productData'; // Import data from productData.js

const Product = () => {
  const { category, key } = useParams();
  const product = data[category][key];

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className='bg-white rounded-lg shadow-lg p-4'>
      <h3>{product.brand}</h3>
      <p>Model: {product.model}</p>
      <p>Quantity: {product.quantity}</p>
      <p>Description: {product.description}</p>
      <p>Year: {product.Year}</p>
      <p>Type: {product.Type}</p>
    </div>
  );
};

export default Product;
