import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { fetchProductsFromFirestore } from '../../firebase';
import ProductCard from '../product/ProductCard';
import { useSearch } from '../../hooks/SearchContext';


const Woman = () => {
  const { searchTerm } = useSearch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProductsFromFirestore();
      const allProducts = [];

      // Loop through each category and push products into allProducts array
      for (const categoryKey  in fetchedProducts) {
        for (const productID  in fetchedProducts[categoryKey]) {
          const product = fetchedProducts[categoryKey][productID];

          if (product.sex === 'woman') {
            allProducts.push({
              ...product,
              categoryId: categoryKey,
              productId: productID
            });
          }
        }
      }
      setProducts(allProducts);
    };
    loadProducts();
  }, []);
  
  const filteredProducts = products.filter(product => {
    return product.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <main className='relative flex-grow my-10 sm:my-10 lg:my-15'>
      <div>
        <h1 className='text-center uppercase text-4xl font-semibold mb-8'>Woman</h1>
      </div> 
      <ul className='grid grid-cols-4 gap-4'>
      {filteredProducts.map(product => (
        <Link to={`/shop/${product.categoryId}/${product.productId}`} key={product.productId}>
          <li key={product.id}>
            <ProductCard product={product} category={product.categoryId} productId={product.productId}  />
          </li>
        </Link>
        )
        )}
      </ul>
    </main>
  )
}

export default Woman