import React from 'react';
import { SlArrowDown } from 'react-icons/sl';
import Footer from '../common/Footer';
import Featured from '../product/Featured';

const Home = () => {
  const nextDivRef = React.useRef(null);

  return (
    <div className='h-screen'>
      <div className='flex justify-center items-end bg-cover bg-center h-screen bg-[url(https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Fmpq-bg.jpg?alt=media&token=68c2375b-3f6c-4bae-9cab-536a93e035f4)]'>
        <button
          className='cursor-pointer rounded-full bg-white bg-opacity-30 px-28  text-5xl text-white lg:mb-6 flex'
          onClick={() =>
            nextDivRef.current.scrollIntoView({ behavior: 'smooth' })
          }
        >
          <SlArrowDown />
        </button>
      </div>
      <div ref={nextDivRef} className='flex'>
        <Featured />
      </div>
      <div className=''>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
