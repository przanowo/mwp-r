import React from 'react';
import { SlArrowDown } from 'react-icons/sl';
import Footer from '../common/Footer';

const Home = () => {
  const nextDivRef = React.useRef(null);

  return (
      // <main className='flex  bg-cover bg-center h-screen bg-[url(https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Fmpq-bg.jpg?alt=media&token=68c2375b-3f6c-4bae-9cab-536a93e035f4)]'>
      //   <div className='flex flex-col items-center justify-center w-full h-max bg-black bg-opacity-50'>
      //     {/* <h1 className='text-4xl text-white'>Welcome to Mini Parfum Queen</h1>
      //     <h2 className='text-2xl text-white'>Discover a World of Scents! 🌸 Dive into our exquisite collection of miniature fragrances, timeless vintage perfumes, and contemporary aromatic wonders. Every drop tells a story, every scent is a journey. Find your signature or relive a memory. Welcome to Mini Parfum Queen where elegance is bottled.</h2> */}

      //   </div>
      // </main>

    <div className="h-screen w-screen snap-y overflow-scroll">
      <div className='flex snap-start justify-center items-end bg-cover bg-center h-screen bg-[url(https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Fmpq-bg.jpg?alt=media&token=68c2375b-3f6c-4bae-9cab-536a93e035f4)]'>
      <button 
          className="cursor-pointer rounded-full bg-white bg-opacity-30 px-28  text-5xl text-white lg:mb-6 flex"
          onClick={() => nextDivRef.current.scrollIntoView({ behavior: 'smooth' })}
        >
          <SlArrowDown />
        </button>
      </div>
      <div ref={nextDivRef} className='flex w-screen h-screen snap-start'>
        <div className="flex w-screen  items-center m-auto justify-centergb-cover bg-center h-screen bg-no-repeat bg-[url(https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2FYour%20paragraph%20text.jpg?alt=media&token=580f3669-6235-40b7-a091-48118521861a)]">
          <p className='w-2/5 text-lg text-left justify-center lg:pl-5'>Discover a World of Scents! 🌸 Dive into our exquisite collection of miniature fragrances, timeless vintage perfumes, and contemporary aromatic wonders. Every drop tells a story, every scent is a journey. Find your signature or relive a memory. Welcome to Mini Parfum Queen where elegance is bottled.</p>
        </div>
      </div>
      <div className="snap-start">
        <Footer />
      </div>
    </div>
  );
};

export default Home;

