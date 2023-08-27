import React from 'react';
import { SlArrowDown } from 'react-icons/sl';

const Home = () => {
  const nextDivRef = React.useRef(null);

  return (
      // <main className='flex  bg-cover bg-center h-screen bg-[url(https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Fmpq-bg.jpg?alt=media&token=68c2375b-3f6c-4bae-9cab-536a93e035f4)]'>
      //   <div className='flex flex-col items-center justify-center w-full h-max bg-black bg-opacity-50'>
      //     {/* <h1 className='text-4xl text-white'>Welcome to Mini Parfum Queen</h1>
      //     <h2 className='text-2xl text-white'>Discover a World of Scents! 🌸 Dive into our exquisite collection of miniature fragrances, timeless vintage perfumes, and contemporary aromatic wonders. Every drop tells a story, every scent is a journey. Find your signature or relive a memory. Welcome to Mini Parfum Queen where elegance is bottled.</h2> */}

      //   </div>
      // </main>

    <main className="">
      <div className='flex bg-cover bg-center h-screen bg-[url(https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Fmpq-bg.jpg?alt=media&token=68c2375b-3f6c-4bae-9cab-536a93e035f4)]'>
      <button 
          className="absolute bottom-4 right-1/2 transform translate-x-1/2 cursor-pointer rounded-full bg-white bg-opacity-20 px-24 text-4xl text-white"
          onClick={() => nextDivRef.current.scrollIntoView({ behavior: 'smooth' })}
        >
          <SlArrowDown />
        </button>

      </div>
      <div ref={nextDivRef} className=''>

    </div>
      <div className="flex flex-row items-center bg-gray-300 text-black text-xl my-28 ">
        <div className='flex'>
          <img src="https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2F28.png?alt=media&token=81aee1b0-e27a-4bb7-a18c-e3a2f63fd2c1" alt="img1" />
        </div>
        <div className='flex'>
          <p className='text-center'>  Discover a World of Scents! 🌸 Dive into our exquisite collection of miniature fragrances, timeless vintage perfumes, and contemporary aromatic wonders. Every drop tells a story, every scent is a journey. Find your signature or relive a memory. Welcome to Mini Parfum Queen where elegance is bottled.</p>
        </div>
        <div className='flex' >
          <img src="https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2F27.png?alt=media&token=1b560eb6-41b9-4935-bc9e-5142f86c0cb9" alt="" />
        </div>
      </div>

      <div className="flex">
        
      </div>
    </main>
  );
};

export default Home;

