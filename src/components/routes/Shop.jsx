import React, { useState, useEffect } from 'react';
import ProductCard from '../product/ProductCard';
import { fetchProductsFromFirestore } from '../../firebase';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState({});

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProductsFromFirestore();
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  return (
    <main className='relative flex-grow my-10 sm:my-10 lg:my-15'>
      <div>
        <h1 className='text-center uppercase text-4xl font-semibold mb-8'>SHOP</h1>
      </div>
      {Object.keys(products).map((category) => (
        <div key={category}>
          <Link to={`/shop/${category}`} className='block mb-4'>
            <h2 className='text-2xl uppercase font-semibold my-4'>{category}</h2>
          </Link>
          <ul className='grid grid-cols-4 gap-4'>
            {products[category] && Object.keys(products[category]).map((productId) => (
              <Link to={`/shop/${category}/${productId}`} key={productId}>
                <li  key={productId}>
                  <ProductCard product={products[category][productId]} category={category} productId={productId} />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
};

export default Shop;
