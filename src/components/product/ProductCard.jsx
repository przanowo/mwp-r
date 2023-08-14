import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, category, productId }) => {
  return (
      <div key={productId} className="border p-4 rounded-md hover:shadow-lg transition-shadow duration-300">
        <div className="h-48 w-full bg-gray-200 overflow-hidden rounded-md">
          <img src={product.mainImageUrl} alt={product.title} className="object-cover h-full w-full" />
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-xl font-bold mt-2">${product.price}</p>
        </div>
      </div>
  );
};

export default ProductCard;
