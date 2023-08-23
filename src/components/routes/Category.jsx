import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductsByCategoryFromFirestore } from '../../firebase';
import ProductCard from '../product/ProductCard';

const Category = ({ category }) => {
  // const { category } = useParams();
  const [allProductsLoaded, setAllProductsLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [lastProduct, setLastProduct] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      const { products: fetchedProducts, lastProduct: fetchedLastProduct } = await fetchProductsByCategoryFromFirestore(category);
      
      const productsArray = Object.keys(fetchedProducts).map(productId => ({
        id: productId,
        ...fetchedProducts[productId],
      }));
      
      setProducts(productsArray);
      setLastProduct(fetchedLastProduct);

      if (!fetchedLastProduct) {
        setAllProductsLoaded(true);
      }
    };

    loadProducts();
  }, [category]);

  const loadMoreProducts = async () => {
    const { products: fetchedProducts, lastProduct: newLastProduct } = await fetchProductsByCategoryFromFirestore(category, lastProduct);
    
    const productsArray = Object.keys(fetchedProducts).map(productId => ({
      id: productId,
      ...fetchedProducts[productId],
    }));
  
    setProducts(prevProducts => [...prevProducts, ...productsArray]);
    setLastProduct(newLastProduct);
  
    if (!newLastProduct) {
      setAllProductsLoaded(true);
    }
  };

  return (
    <main className='relative flex-grow my-10 sm:my-10 lg:my-15'>
      <h2 className='text-2xl uppercase font-semibold my-4'>{category}</h2>
      <ul className='grid grid-cols-4 gap-4'>
      {products.map(product => (
          <li key={product.id}>
            <ProductCard product={product} category={product.category} productId={product.id} />
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
};

export default Category;
