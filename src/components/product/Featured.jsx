import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import {
  fetchFeaturedProducts,
  fetchLikedProducts,
  // fetchSaleProducts,
  fetchManProducts,
  fetchWomanProducts,
} from '../../firebase';

const limitNum = 6;

const Featured = () => {
  const [productsLiked, setProductsLiked] = useState([]);
  const [productsFeatured, setProductsFeatued] = useState([]);
  // const [productsSale, setProductsSale] = useState([]);
  const [productsMan, setProductsMan] = useState([]);
  const [productsWomen, setProductsWomen] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const resultFeatured = await fetchFeaturedProducts(limitNum);
      const resultLiked = await fetchLikedProducts(limitNum);
      // const resultSale = await fetchSaleProducts(limitNum);
      const resultMan = await fetchManProducts(limitNum);
      const resultWomen = await fetchWomanProducts(limitNum);
      setProductsFeatued(resultFeatured.productsFeatured);
      setProductsLiked(resultLiked.productsLiked);
      // setProductsSale(resultSale.productsSale);
      setProductsWomen(resultWomen.productsWomen);
      setProductsMan(resultMan.productsMan);
      setLoading(false);
    };
    fetchProducts();
  }, [
    productsFeatured,
    productsLiked,
    // productsSale,
    productsMan,
    productsWomen,
  ]);

  return (
    <div className='my-12 justify-center items-center'>
      <h3 className='text-3xl p-4'>Exclusive Women Permfumes!</h3>
      <ul className='grid grid-cols-3 lg:grid-cols-6  gap-4'>
        {productsWomen.map((product, index) => (
          <li
            key={product.id}
            className={` ${index >= 3 ? 'hidden lg:block' : ''}`}
          >
            <ProductCard product={product} productId={product.id} />
          </li>
        ))}
      </ul>
      <h3 className='text-3xl p-4'>Exclusive Men Permfumes!</h3>
      <ul className='grid grid-cols-3 lg:grid-cols-6 gap-4'>
        {productsMan.map((product, index) => (
          <li
            key={product.id}
            className={` ${index >= 3 ? 'hidden lg:block' : ''}`}
          >
            <ProductCard product={product} productId={product.id} />
          </li>
        ))}
      </ul>
      <h3 className='text-3xl p-4'>Featured Products!</h3>
      <ul className='grid grid-cols-3 lg:grid-cols-6 gap-4'>
        {productsFeatured.map((product, index) => (
          <li
            key={product.id}
            className={` ${index >= 3 ? 'hidden lg:block' : ''}`}
          >
            <ProductCard product={product} productId={product.id} />
          </li>
        ))}
      </ul>
      <h3 className='text-3xl p-4'>Liked Products!</h3>
      <ul className='grid grid-cols-3 lg:grid-cols-6 gap-4'>
        {productsLiked.map((product, index) => (
          <li
            key={product.id}
            className={` ${index >= 3 ? 'hidden lg:block' : ''}`}
          >
            <ProductCard product={product} productId={product.id} />
          </li>
        ))}
      </ul>
      {/* <h3 className='text-3xl p-4'>Sale!</h3>
      <ul className='grid grid-cols-6 gap-4'>
        {productsSale.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} productId={product.id} />
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Featured;
