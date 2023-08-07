import React from 'react'
import { Link } from 'react-router-dom'

import man from '../../images/man.png'
import woman from '../../images/woman.png'
import vintage from '../../images/vintage.png'
import miniature from '../../images/miniature.png'
import sample from '../../images/sample.png'
import newP from '../../images/new.png'



const Home = () => {
  return (
    <main className='relative flex-grow my-10 sm:my-10 lg:my-15'>
    <div className='mb-12 md:mb-14 xl:mb-16 px-2.5 grid grid-cols-2 sm:grid-cols-9 gap-2 md:gap-2.5 max-w-[1920px] mx-auto'>
      <div className="flex mx-auto coll-span-full sm:col-span-5 justify-center items-center"> 
        <Link className='flex mx-auto coll-span-full sm:col-span-5 justify-center items-center' to='/woman'>
          <img className='h-full group flex justify-center relative overflow-hidden' alt="woman" src={woman} /> 
          <h1 className='uppercase w-1/3 text-sm lg:text-3xl p-2 lg:p-4 absolute text-center bg-cyan-100/50'>woman</h1>
        </Link>
      </div>
      <div className="mx-auto coll-span-1 sm:col-span-2">
        <Link className='flex h-full mx-auto coll-span-full sm:col-span-2 justify-center items-center' to='/vintage'> 
          <img className='h-full group flex justify-center relative overflow-hidden' alt="vintage" src={vintage} /> 
          <h1 className='uppercase text-sm lg:text-3xl p-2 lg:p-4 absolute text-center bg-cyan-100/50'>vintage</h1>
        </Link>
      </div>
      <div className="mx-auto coll-span-1 sm:col-span-2">
        <Link className='flex h-full mx-auto coll-span-full sm:col-span-2 justify-center items-center' to='/miniature'> 
          <img className='h-full group flex justify-center relative overflow-hidden' alt="miniature" src={miniature} /> 
          <h1 className='uppercase text-sm lg:text-3xl p-2 lg:p-4 absolute text-center bg-cyan-100/50'>miniature</h1>
        </Link>
      </div>
      <div className="mx-auto coll-span-1 sm:col-span-2">
        <Link className='flex h-full mx-auto coll-span-full sm:col-span-2 justify-center items-center'  to='/sample'> 
          <img className='h-full group flex justify-center relative overflow-hidden' alt="sample" src={sample} /> 
          <h1 className='uppercase text-sm lg:text-3xl p-2 lg:p-4 absolute text-center bg-cyan-100/50'>sample</h1>
        </Link>
      </div>
      <div className="mx-auto coll-span-1 sm:col-span-2">
        <Link className='flex h-full mx-auto coll-span-full sm:col-span-2 justify-center items-center'  to='/newP'> 
          <img className='h-full group flex justify-center relative overflow-hidden' alt="new" src={newP} /> 
          <h1 className='uppercase text-sm lg:text-3xl p-2 lg:p-4 absolute text-center bg-cyan-100/50'>new</h1>
        </Link>
      </div>
      <div className="mx-auto coll-span-full sm:col-span-5">
        <Link className='flex mx-auto coll-span-full sm:col-span-5 justify-center items-center'  to='/man'> 
          <img className='h-full group flex justify-center relative overflow-hidden' alt="man" src={man} /> 
          <h1 className='uppercase w-1/3 text-sm lg:text-3xl p-2 lg:p-4 absolute text-center bg-cyan-100/50'>man</h1>
        </Link>
      </div>
    </div>
    </main>
  )
}

export default Home