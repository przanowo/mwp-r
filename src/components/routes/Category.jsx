import React, { useEffect, useState, useRef } from 'react';
import { firstBatchOfProducts, nextBatchOfProducts } from '../../firebase';
import ProductCard from '../product/ProductCard';
import { SlArrowDown } from 'react-icons/sl';
import Footer from '../common/Footer';
import SearchComponent from '../product/SearchComponent';

const limitNum = 42;

const Category = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const nextDivRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [lastVisibleProduct, setLastVisibleProduct] = useState(null);

  const categoryToBackgroundUrl = {
    vintage:
      'https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Fvintage.jpg?alt=media&token=a46c7ea3-0988-4307-bd54-2d31e25d6832',
    miniature:
      'https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Fminiature.jpg?alt=media&token=4012f362-73f8-4b5f-a371-5845355a944d',
    perfume:
      'https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Fperfume.jpg?alt=media&token=d396d83c-5a15-40a2-8938-6fc55a31463a',
    sample:
      'https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Fsample.jpg?alt=media&token=35f967b0-d218-4c2e-8867-5e0a8575a48c',
    soap: 'https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2FSOAP.jpg?alt=media&token=0c4d3b4b-8816-4081-b27e-b03e1a81fae5',
    gift: 'https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2FGIFT.jpg?alt=media&token=813c0bc1-33f1-4575-b553-9fa1b1b3e074',
    gold: 'https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2FGOLD.jpg?alt=media&token=d3b8c8d9-9219-436a-bcca-27b82ac333f8',
  };

  useEffect(() => {
    if (searchResults.length > 0) {
      setProducts(searchResults);
      return;
    } else {
      const fetchFirstBatch = async () => {
        setLoading(true);
        const result = await firstBatchOfProducts(category, limitNum);
        setProducts(result.products);
        setLastVisibleProduct(result.lastProduct);
        setLoading(false);
      };
      fetchFirstBatch();
    }
  }, [category, searchResults]);

  const loadMoreProducts = async () => {
    setLoading(true);
    const result = await nextBatchOfProducts(
      category,
      limitNum,
      lastVisibleProduct
    );
    setProducts((prevProducts) => [...prevProducts, ...result.products]);
    setLastVisibleProduct(result.lastProduct);
    setLoading(false);
  };

  const handleClick = async () => {
    await loadMoreProducts();
  };

  const backgroundImageURL = categoryToBackgroundUrl[category.toLowerCase()];

  return (
    <div className='h-screen justify-center items-center'>
      <div
        className='hidden lg:flex bg-cover bg-center items-end justify-center h-screen'
        style={{ backgroundImage: `url(${backgroundImageURL})` }}
      >
        <button
          className='cursor-pointer rounded-full bg-white bg-opacity-20 px-24 text-5xl lg:mb-6 text-white'
          onClick={() =>
            nextDivRef.current.scrollIntoView({ behavior: 'smooth' })
          }
        >
          <SlArrowDown />
        </button>
      </div>
      <div className='flex lg:hidden text-center justify-center pt-10'>
        <p className='text-4xl uppercase text-gray-700'>{category}</p>
        {/* <img
          src={backgroundImageURL}
          alt={category}
          className='object-cover h-64 w-full'
        /> */}
      </div>
      <div className='lg:pt-24' ref={nextDivRef}>
        <SearchComponent
          category={category}
          setSearchResults={setSearchResults}
        />
        <ul className='grid grid-cols-3 lg:grid-cols-6 gap-4 mx-4'>
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} productId={product.id} />
            </li>
          ))}
        </ul>
      </div>
      <div className='flex justify-center m-16 text-2xl '>
        {loading && <p>Loading...</p>}
        <button
          onClick={handleClick}
          className='bg-orange-100 hover:bg-orange-200 px-4 py-2 rounded-md'
        >
          Load more
        </button>
      </div>
      <div className='hidden lg:block'>
        <Footer />
      </div>
    </div>
  );
};

export default Category;
