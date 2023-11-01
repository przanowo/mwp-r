import React, { useEffect } from 'react';
import { SlArrowDown } from 'react-icons/sl';
import Footer from '../common/Footer';
import Featured from '../product/Featured';
import { Link } from 'react-router-dom';
import SearchComponent from '../product/SearchComponent';
import ProductCard from '../product/ProductCard';

const Home = () => {
  const nextDivRef = React.useRef(null);
  const [searchResults, setSearchResults] = React.useState([]);
  const [products, setProducts] = React.useState([]);

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
    const result = searchResults;
    setProducts(result);
  }, [searchResults]);

  return (
    <div className='h-screen'>
      <div className='flex justify-center items-end bg-cover bg-center h-screen bg-[url(https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2FMobBgText.jpg?alt=media&token=f9de62bd-43e2-4082-a155-adc79eb050d9)] lg:bg-[url(https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Fmpq-bg.jpg?alt=media&token=68c2375b-3f6c-4bae-9cab-536a93e035f4)]'>
        <button
          className='cursor-pointer rounded-full bg-white text-white bg-opacity-30 px-28  text-5xl mb-16 lg:mb-6 flex'
          onClick={() =>
            nextDivRef.current.scrollIntoView({ behavior: 'smooth' })
          }
        >
          <SlArrowDown />
        </button>
      </div>
      <div className='flex lg:pt-24'>
        <SearchComponent setSearchResults={setSearchResults} />
        <ul className='grid grid-cols-3 lg:grid-cols-6 gap-4 mx-4'>
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} productId={product.id} />
            </li>
          ))}
        </ul>
      </div>

      {/* mobile components */}
      <div ref={nextDivRef} className='flex flex-col lg:hidden'>
        <div className='flex text-4xl pl-4 pt-6 pb-2 text-center justify-center'>
          CATEGORIES
        </div>
        <div className='flex py-4'>
          <Link to='shop/miniature'>
            <img src={categoryToBackgroundUrl.miniature} alt='miniature' />
          </Link>
        </div>
        <div className='flex py-4'>
          <Link to='shop/parfum'>
            <img src={categoryToBackgroundUrl.perfume} alt='perfume' />
          </Link>
        </div>
        <div className='flex py-4'>
          <Link to='shop/sample'>
            <img src={categoryToBackgroundUrl.sample} alt='sample' />
          </Link>
        </div>
        <div className='flex py-4'>
          <Link to='shop/soapandpowder'>
            <img src={categoryToBackgroundUrl.soap} alt='soap' />
          </Link>
        </div>
        <div className='flex py-4'>
          <Link to='shop/gift'>
            <img src={categoryToBackgroundUrl.gift} alt='gift' />
          </Link>
        </div>
        <div className='flex py-4'>
          <Link to='shop/gold'>
            <img src={categoryToBackgroundUrl.gold} alt='gold' />
          </Link>
        </div>
      </div>

      <div className='flex'>
        <Featured />
      </div>
      <div className='hidden lg:block'>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
