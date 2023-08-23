import React, { useEffect, useState } from 'react';
import { fetchProductsFromFirestore } from '../../firebase';
import ProductCard from '../product/ProductCard';

const Woman = () => {
  const [products, setProducts] = useState([]);
  const [lastProduct, setLastProduct] = useState(null);
  const [allProductsLoaded, setAllProductsLoaded] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      const { allProducts, lastVisible } = await fetchProductsFromFirestore();

      const womanProductsArray = Object.keys(allProducts).flatMap(category =>
        Object.keys(allProducts[category]).map(productId => {
          if (allProducts[category][productId].sex === 'woman') {
            return {
              id: productId,
              ...allProducts[category][productId]
            };
          }
          return null;
        }).filter(Boolean)
      );

      setProducts(womanProductsArray);
      setLastProduct(lastVisible);

      if (!lastVisible) {
        setAllProductsLoaded(true);
      }
    };

    loadProducts();
  }, []);
  
  const loadMoreProducts = async () => {
    const { allProducts, lastVisible: newLastProduct } = await fetchProductsFromFirestore(lastProduct);
    
    const newWomanProductsArray = Object.keys(allProducts).flatMap(category =>
      Object.keys(allProducts[category]).map(productId => {
        if (allProducts[category][productId].sex === 'woman') {
          return {
            id: productId,
            ...allProducts[category][productId]
          };
        }
        return null;
      }).filter(Boolean)
    );

    setProducts(prevProducts => [...prevProducts, ...newWomanProductsArray]);
    setLastProduct(newLastProduct);
  
    if (!newLastProduct) {
      setAllProductsLoaded(true);
    }
  };

  return (
    <main className='relative flex-grow my-10 sm:my-10 lg:my-15'>
      <h1 className='text-center uppercase text-4xl font-semibold mb-8'>Woman</h1>
      
      <ul className='grid grid-cols-4 gap-4'>
        {products.map(product => (
          <li key={product.id}>
            <ProductCard product={product} category={product.category} productId={product.id}  />
          </li>
        ))}
      </ul>
      {!allProductsLoaded && (
        <button onClick={loadMoreProducts} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>
            Load More
        </button>
      )}
    </main>
  );
}

export default Woman;
