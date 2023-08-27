import React, { useEffect, useState } from 'react';
import { fetchProductsByCategoryFromFirestore } from '../../firebase';
import ProductCard from '../product/ProductCard';
import { SlArrowDown } from 'react-icons/sl';

const Category = ({ category }) => {
  const [allProductsLoaded, setAllProductsLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [lastProduct, setLastProduct] = useState(null);
  const nextDivRef = React.useRef(null);

  const categoryToBackgroundUrl = {
    'vintage': 'https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Fvintage.jpg?alt=media&token=a46c7ea3-0988-4307-bd54-2d31e25d6832',
    'miniature': 'https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Fminiature.jpg?alt=media&token=4012f362-73f8-4b5f-a371-5845355a944d',
    'parfum': 'https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Fparfum.jpg?alt=media&token=6b39ae76-2c73-4cf8-9cb2-f6dc8076d85b',
    'sample': 'https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Fsample.jpg?alt=media&token=35f967b0-d218-4c2e-8867-5e0a8575a48c'
  };

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

  const backgroundImageURL = categoryToBackgroundUrl[category.toLowerCase()];

  return (
    <main className=''>
      <div 
        className='flex bg-cover bg-center h-screen'
        style={{ backgroundImage: `url(${backgroundImageURL})` }}
      >
        <button 
            className="absolute bottom-4 right-1/2 transform translate-x-1/2 cursor-pointer rounded-full bg-white bg-opacity-20 px-24 text-4xl text-white"
            onClick={() => nextDivRef.current.scrollIntoView({ behavior: 'smooth' })}
          >
            <SlArrowDown />
        </button>
      </div>
      <div className='pt-24' ref={nextDivRef}>
        {/* <h2 className='text-2xl uppercase font-semibold my-4'>{category}</h2> */}
        <ul className='grid grid-cols-4 gap-4'>
        {products.map(product => (
            <li key={product.id}>
              <ProductCard product={product} category={product.category} productId={product.id} />
            </li>
          ))}
          
        </ul>
      </div>
      {!allProductsLoaded && (
      <button onClick={loadMoreProducts} className='bg-blue-200 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>
        Load More
      </button>
      )}
      </main>
  );
};

export default Category;
