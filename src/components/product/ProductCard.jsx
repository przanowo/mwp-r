import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, category, productId }) => {
  const navigate = useNavigate();
console.log(product, category, productId)
  const handleCardClick = () => {
    navigate(`/shop/${category}/${productId}`);
  };

  return (
    <div
      className='bg-white rounded-lg shadow-lg p-4 cursor-pointer'
      onClick={handleCardClick}
    >
      <h3>{product.brand}</h3>
      <p>Model: {product.model}</p>
      <p>Quantity: {product.quantity}</p>
      <p>Description: {product.description}</p>
      <p>Year: {product.Year}</p>
      <p>Type: {product.Type}</p>
    </div>
  );
};

export default ProductCard;
