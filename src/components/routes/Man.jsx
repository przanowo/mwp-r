import React from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { fetchProductsFromFirestore } from '../../firebase';
import { useEffect, useState } from 'react';
import ProductCard from '../product/ProductCard';
import { MdEmojiObjects } from 'react-icons/md';
import { useSearch } from '../../hooks/SearchContext';


const Man = () => {
  const { searchTerm } = useSearch();
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProductsFromFirestore();
      const allProducts = [];
      // Loop through each category and push products into allProducts array
      for (const categoryKey  in fetchedProducts) {
        console.log('categoryKey', categoryKey);
        for (const productID  in fetchedProducts[categoryKey]) {
          // console.log('productID', productID);
          const product = fetchedProducts[categoryKey][productID];
          
          // console.log('product', product);  
          if (product.sex === 'man') {
            allProducts.push({
              ...product,
              categoryId: categoryKey,
              id: productID
            });
          }
        }
      }
      setProducts(allProducts);
      // console.log('allProducts for men', allProducts);
    };
  
    loadProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    return product.title.toLowerCase().includes(searchTerm.toLowerCase());
  });




  return (
    <main className='relative flex-grow my-10 sm:my-10 lg:my-15'>
      <div>
        <h1 className='text-center uppercase text-4xl font-semibold mb-8'>Man</h1>
      </div> 
      <ul className='grid grid-cols-4 gap-4'>
      
      {filteredProducts.map(product => (
          <li key={product.id}>
            <ProductCard product={product} category={product.categoryId} productId={product.id}  />
          </li>
        )
        )}
      </ul>
    </main>
  )
}

export default Man