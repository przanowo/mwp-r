import React, { useState, useEffect } from 'react';
import ProductCard from '../product/ProductCard';
import { fetchProductsFromFirestore } from '../../firebase';
import { Link } from 'react-router-dom';
import { useSearch } from '../../hooks/SearchContext';

const Shop = () => {
  const { searchTerm } = useSearch();
  const [products, setProducts] = useState({});
  // const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProductsFromFirestore();
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  // const handleSearchChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  const filteredProducts = (categoryProducts) => {
    console.log('categoryProducts', categoryProducts)
    return Object.keys(categoryProducts).filter((productId) => {
      const product = categoryProducts[productId];
      return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  return (
    <main className='flex-grow relative my-10 sm:my-10 lg:my-15'>
      <div>
        <h1 className='text-center uppercase text-4xl font-semibold mb-8'>SHOP</h1>
      </div>
      {/* <div className='mb-6'>
        <input 
          type='text' 
          value={searchTerm} 
          onChange={handleSearchChange}
          placeholder="Search for products..." 
          className="border p-2 w-full rounded"
        />
      </div> */}
      {Object.keys(products).map((category) => (
        <div key={category}>
          <Link to={`/shop/${category}`} className='block mb-4'>
            <h2 className='text-2xl uppercase font-semibold my-4'>{category}</h2>
          </Link>
          <ul className='grid grid-cols-4 gap-4'>
            {products[category] && filteredProducts(products[category]).map((productId) => (
              <li key={productId}>
                <ProductCard product={products[category][productId]} category={category} productId={productId} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
};

export default Shop;
