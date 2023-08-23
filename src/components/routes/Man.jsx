import React from 'react'
import { fetchProductsFromFirestore } from '../../firebase';
import { useEffect, useState } from 'react';
import ProductCard from '../product/ProductCard';

const Man = () => {
  const [products, setProducts] = useState({}); 
  const [lastProduct, setLastProduct] = useState(null);
  const [allProductsLoaded, setAllProductsLoaded] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      const { allProducts, lastVisible } = await fetchProductsFromFirestore();
      let manProducts = {};

      // Filtering products by sex === 'man'
      for (const category in allProducts) {
        manProducts[category] = {};
        for (const productId in allProducts[category]) {
          if (allProducts[category][productId].sex === 'man') {
            manProducts[category][productId] = {
              id: productId,
              ...allProducts[category][productId]
            };
          }
        }
      }
      
      setProducts(manProducts);
      setLastProduct(lastVisible);
      if (!lastVisible) {
        setAllProductsLoaded(true);
      }
    };
  
    loadProducts();
  }, []);

  const loadMoreProducts = async () => {
    const { allProducts, lastVisible: newLastProduct } = await fetchProductsFromFirestore(lastProduct);
    
    let manProducts = {};

    for (const category in allProducts) {
      if (!manProducts[category]) manProducts[category] = {};

      for (const productId in allProducts[category]) {
        
        if (allProducts[category][productId].sex === 'man') {
          manProducts[category][productId] = {
            id: productId,
            ...allProducts[category][productId]
          };
        }
      }
    }

    setProducts(prevProducts => {
      return { ...prevProducts, ...manProducts };
  });
  
    setLastProduct(newLastProduct);
  
    if (!newLastProduct) {
      setAllProductsLoaded(true);
    }
  };

  return (
    <main className='relative flex-grow my-10 sm:my-10 lg:my-15'>
      <div>
        <h1 className='text-center uppercase text-4xl font-semibold mb-8'>Man</h1>
      </div> 
      {Object.keys(products).map((category) => (
        <div key={category}>
          <h2 className='text-2xl uppercase font-semibold my-4'>{category}</h2>
          <ul className='grid grid-cols-4 gap-4'>
          {Object.keys(products[category]).map(productId => (
              <li key={productId}>
                <ProductCard product={products[category][productId]} category={category} productId={productId}  />
              </li>
          ))}
      </ul>
      {!allProductsLoaded && (
        <button onClick={loadMoreProducts} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>
            Load More
        </button>
      )}
      </div>
      ))}


    </main>
  )
}

export default Man