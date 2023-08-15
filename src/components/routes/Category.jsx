import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductsFromFirestore } from '../../firebase';
import { useEffect, useState } from 'react';
import ProductCard from '../product/ProductCard';
import { Link } from 'react-router-dom';
import { useSearch } from '../../hooks/SearchContext';

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState({});
  const { searchTerm } = useSearch();

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProductsFromFirestore(category);
      setProducts(fetchedProducts || {});
    };

    loadProducts();
  }, [category]);

  const filteredProducts = (categoryProducts) => {
    return Object.keys(categoryProducts).filter((productId) => {
      const product = categoryProducts[productId];
      return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  return (
    <main className='relative flex-grow my-10 sm:my-10 lg:my-15'>
      <h2 className='text-2xl uppercase font-semibold my-4'>{category}</h2>
      <ul className='grid grid-cols-4 gap-4'>
        {Object.keys(products).map((category) => (
          Object.keys(products[category]) && filteredProducts(products[category]).map((productId) => (
            <Link to={`/shop/${category}/${productId}`} key={productId}>
              <li  key={productId}>
                <ProductCard product={products[category][productId]} category={category} productId={productId} />
              </li>
            </Link>
          ))
        ))}
      </ul>
    </main>
  );
}

export default Category;
