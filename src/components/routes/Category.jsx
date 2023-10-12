import React, { useEffect, useState } from 'react';
import { fetchProductsByCategoryFromFirestore, getTotalNumberOfProducts } from '../../firebase';
import ProductCard from '../product/ProductCard';
import { SlArrowDown } from 'react-icons/sl';
import Footer from '../common/Footer';
import SearchComponent from '../product/SearchComponent'; // Import the SearchComponent

const PRODUCTS_PER_PAGE = 24;

const Category = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastProduct, setLastProduct] = useState(null);
  const nextDivRef = React.useRef(null);
  const [searchResults, setSearchResults] = useState([]); // State to hold search results

  const categoryToBackgroundUrl = {
    'vintage': 'https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Fvintage.jpg?alt=media&token=a46c7ea3-0988-4307-bd54-2d31e25d6832',
    'miniature': 'https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Fminiature.jpg?alt=media&token=4012f362-73f8-4b5f-a371-5845355a944d',
    'perfume': 'https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Fperfume.jpg?alt=media&token=d396d83c-5a15-40a2-8938-6fc55a31463a',
    'sample': 'https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Fsample.jpg?alt=media&token=35f967b0-d218-4c2e-8867-5e0a8575a48c'
  };

  useEffect(() => {
    const loadTotalNumberOfProducts = async () => {
      const totalNumberOfProducts = await getTotalNumberOfProducts(category);
      console.log(totalNumberOfProducts);
      setTotalPages(Math.ceil(totalNumberOfProducts / PRODUCTS_PER_PAGE));
    };

    loadTotalNumberOfProducts();

    setCurrentPage(1);
    setLastProduct(null);
  }, [category]);

  useEffect(() => {
    const loadProducts = async () => {
      if (searchResults.length > 0) {
        // If there are search results, display them instead of fetching products
        setProducts(searchResults);
      } else {
        const { products: fetchedProducts, lastProduct: fetchedLastProduct } = await fetchProductsByCategoryFromFirestore(category, lastProduct, PRODUCTS_PER_PAGE);
        setProducts(fetchedProducts);
        setLastProduct(fetchedLastProduct);
      }
    };

    loadProducts();
  }, [category, currentPage, searchResults]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const backgroundImageURL = categoryToBackgroundUrl[category.toLowerCase()];

  return (
    <div className='h-screen w-screen snap-y overflow-scroll justify-center items-center'>
      <div
        className='snap-start flex bg-cover bg-center items-end justify-center h-screen'
        style={{ backgroundImage: `url(${backgroundImageURL})` }}
      >
        <button
          className="cursor-pointer rounded-full bg-white bg-opacity-20 px-24 text-5xl lg:mb-6 text-white"
          onClick={() => nextDivRef.current.scrollIntoView({ behavior: 'smooth' })}
        >
          <SlArrowDown />
        </button>
      </div>
      <div className='snap-start pt-24' ref={nextDivRef}>
        <SearchComponent category={category} setSearchResults={setSearchResults} /> {/* Add the SearchComponent */}
        <ul className='grid grid-cols-6 gap-4'>
          {products.map(product => (
            <li key={product.id}>
              <ProductCard product={product} productId={product.id} />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center mb-16">
        <button className='p-2 justify-center' onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <div className='p-2 justify-center'>
          Page {currentPage} of {totalPages}
        </div>
        <button className='p-2 justify-center' onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default Category;
