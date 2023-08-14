import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductsByCategoryFromFirestore } from '../../firebase';
import { useEffect, useState } from 'react';
import ProductCard from '../product/ProductCard';
import { Link } from 'react-router-dom';

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState({});

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProductsByCategoryFromFirestore(category);
      setProducts(fetchedProducts || {});
    };

    loadProducts();
  }, [category]);

  return (
    <main className='relative flex-grow my-10 sm:my-10 lg:my-15'>
      <h2 className='text-2xl uppercase font-semibold my-4'>{category}</h2>
      <ul className='grid grid-cols-4 gap-4'>
        {Object.keys(products).map((productId) => (
          <Link to={`/shop/${category}/${productId}`} key={productId}>
            <li>
              <ProductCard product={products[productId]} category={category} productId={productId} />
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}

export default Category;
