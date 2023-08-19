import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductsByCategoryFromFirestore } from '../../firebase';
import { useEffect, useState } from 'react';
import ProductCard from '../product/ProductCard';
import { Link } from 'react-router-dom';
import { useSearch } from '../../hooks/SearchContext';

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const { searchTerm } = useSearch();

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProductsByCategoryFromFirestore(category);
      const productsArray = Object.keys(fetchedProducts).map(productId => ({
        id: productId,
        ...fetchedProducts[productId],
      }));
      setProducts(productsArray);
    };

    loadProducts();
  }, [category]);

  const filteredProducts = () => {
    if (!searchTerm) return products;
    return products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  return (
    <main className='relative flex-grow my-10 sm:my-10 lg:my-15'>
      <h2 className='text-2xl uppercase font-semibold my-4'>{category}</h2>
      <ul className='grid grid-cols-4 gap-4'>
      {filteredProducts().map(product => (
          // <Link to={`/shop/${product.category}/${product.id}`} key={product.id}>
            <li key={product.id}>
              <ProductCard product={product} category={product.category} productId={product.id} />
            </li>
          // </Link>
        ))}
      </ul>
    </main>
  );
}

export default Category;
