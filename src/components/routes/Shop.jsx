import React, { useState, useEffect } from 'react';
import ProductCard from '../product/ProductCard';
import { fetchProductsFromFirestore } from '../../firebase';
import { Link } from 'react-router-dom';
import { SlArrowDown } from 'react-icons/sl';

const Shop = () => {
  const [products, setProducts] = useState({});
  const nextDivRef = React.useRef(null);

  useEffect(() => {
    const loadProducts = async () => {
      const { allProducts } = await fetchProductsFromFirestore();
      
      for (const category in allProducts) {
        for (const productId in allProducts[category]) {
          allProducts[category][productId] = {
            id: productId,
            ...allProducts[category][productId]
          };
        }
      }
      
      setProducts(allProducts);
    };
    loadProducts();
  }, []);



  return (
    <main className=' '>
        <div className='flex bg-cover bg-center h-screen bg-[url(https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Fshop.jpg?alt=media&token=116824fc-c784-43cc-8f8d-7a1fd5999604)]'>
        <button 
            className="absolute bottom-4 right-1/2 transform translate-x-1/2 cursor-pointer rounded-full bg-white bg-opacity-20 px-24 text-4xl text-white"
            onClick={() => nextDivRef.current.scrollIntoView({ behavior: 'smooth' })}
          >
            <SlArrowDown />
          </button>
      </div>

        <div className='flex flex-col ' ref={nextDivRef}>
        {Object.keys(products).map((category) => (
          <div className='pt-24' key={category}>
            <Link to={`/shop/${category}`} className='block mb-4'>
              <h2 className='text-2xl uppercase font-semibold my-4 text-center'>{category}</h2>
            </Link>
            <ul className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
              {Object.keys(products[category]).map((productId) => (
                <li key={productId}>
                  <ProductCard product={products[category][productId]} category={category} productId={productId} />
                </li>
              ))}
            </ul>
            <Link to={`/shop/${category}`} className='block mt-4 text-right'>
              <button className='bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200'>
                View All
              </button>
            </Link>

          </div>
        ))}
        </div>
    </main>
  );
};

export default Shop;
