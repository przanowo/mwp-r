import React from 'react';
import ProductCard from '../product/ProductCard';
import data from './productData'; // Import data from productData.js

const Shop = () => {
  return (
    <main className='relative flex-grow my-10 sm:my-10 lg:my-15'>
      <div>shop</div>
      {Object.keys(data).map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          <ul className='grid grid-cols-2 gap-4'>
            {Object.keys(data[category]).map((productId) => (
              <li key={productId}>
                <ProductCard product={data[category][productId]} category={category} productId={productId} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
};

export default Shop;
