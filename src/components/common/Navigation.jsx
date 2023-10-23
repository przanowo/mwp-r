import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../../hooks/AuthContext'
import { CartContext } from '../../hooks/CartContext';
import { logout } from '../../firebase'
// import Search from '../product/Search'
import { HiMenuAlt1, HiOutlineHome, HiOutlineShoppingCart } from 'react-icons/hi'
import { MdOutlineAccountCircle,  } from 'react-icons/md'
import logoblack from '../../logoblack.png'
import logowhite from '../../logowhite.png'
// import { useSearch } from '../../hooks/SearchContext';

const Navigation = () => {
    const { user } = React.useContext(AuthContext); // Get the user from AuthContext
    const [scrolled, setScrolled] = useState(true);
    const { cart } = React.useContext(CartContext);
    const [ startedScrolling, setStartedScrolling] = useState(false);
    // const [hovered, setHovered] = useState(false);

    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
      // Function to handle scroll events
      const handleScroll = () => {
        if (window.scrollY > 0) {
          // Page is not at the top
          setIsAtTop(false);
        } else {
          // Page is at the top
          setIsAtTop(true);
        }
      };
  
      // Add the scroll event listener when the component mounts
      window.addEventListener('scroll', handleScroll);
  
      // Remove the scroll event listener when the component unmounts
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            console.log("Successfully logged out!");
            // Optional: redirect or update state/UI here
        } catch (error) {
            console.error("Error logging out: ", error.message);
        }
    };
    
    // useEffect(() => {
    //     const handleScroll = () => {
    //         const snapContainer = document.querySelector('.snap-y');
    //         if (snapContainer) {
    //             const offset = snapContainer.scrollTop;
    //             if (offset > 0 && !startedScrolling) {
    //                 setScrolled(true);
    //                 setStartedScrolling(false); // Update the state here
    //             }
    
    //             if (offset === 0) {
    //                 setScrolled(false);
    //                 setStartedScrolling(false); // Update the state here
    //             }
    //         };
    //     };
    
    //     // Attach the scroll listener if the element exists
    //     const snapContainer = document.querySelector('.snap-y');
    //     if (snapContainer) {
    //         snapContainer.addEventListener('scroll', handleScroll);
    //     }
    
    //     // Cleanup
    //     return () => {
    //         // Remove the event listener if the element exists
    //         if (snapContainer) {
    //             snapContainer.removeEventListener('scroll', handleScroll);
    //         }
    //     };
    // }, []);

    const logoSrc = isAtTop ? logowhite : logoblack;
    const fixedLogoClasses = `${logoSrc}`;
    const navbarClasses = isAtTop ? 'text-white' : 'bg-white text-black';
    const fixedNavbarClasses = `lg:fixed z-20 w-screen px-4 transition duration-200 ease-in-out sm:h-18 md:px-8 lg:px-2.5 ${navbarClasses}`;


  return (
    <nav 
        className="lg: absolute z-20 h-26 sm:h-20 lg:h-20 overflow-hidden lg:mb-6"
        >
        <div className={fixedNavbarClasses}>
            <div className="flex items-center justify-center lg:justify-between max-w-screen h-full w-full">
                <Link to='/'> <img className='max-h-24 md:max-h-24 lg:max-h-16 inline-flex focus:outline-none lg:pr-10 ' alt="Logo" src={fixedLogoClasses} /> </Link>

{/* //desktop menu */}
                <div className="flex text-center items-center">
                    <Link className='px-3 py-2 rounded-lg hover:bg-white/20 hover:text-lg' to='/shop/parfum'> Perfume </Link>
                    <Link className='px-3 py-2 rounded-lg hover:bg-white/20 hover:text-lg' to='/shop/miniature'> Miniature </Link>
                    <Link className='px-3 py-2 rounded-lg hover:bg-white/20 hover:text-lg' to='/shop/sample'> Sample </Link>
                    <Link className='px-3 py-2 rounded-lg hover:bg-white/20 hover:text-lg' to='/shop/soapandpowder'> Soap & Powder </Link>
                    <Link className='px-3 py-2 rounded-lg hover:bg-white/20 hover:text-lg' to='/shop/gift'> Gifts </Link>
                </div>
                <div className='lg:flex hidden ltr:md:ml-6 rtl:md:mr-6 ltr:xl:ml-10 rtl:xl:mr-10 py-7'>
                    {user ? ( // If user is logged in, show logout button
                        <>
                        <Link to='/'><button className='px-3 py-2' onClick={handleLogout}> Logout </button></Link>
                        <Link className='px-3 py-2 text-2xl text-center' to='/account'> <MdOutlineAccountCircle /> </Link>
                        </>
                        ) : (
                        // If user is not logged in, show login and register buttons
                    <>
                        <Link className='px-3 py-2' to='/login'> Login </Link>
                        <Link className='px-3 py-2' to='/signup'> Register </Link>
                    </>
                        )}
                    { user && user.uid === 'gwCvu8CwOCToe2owDmtKEHm7Cvj2' ? (
                        <Link className='px-3 py-2' to='/admin'> Admin </Link>
                    ) : (
                        null
                    )}
                    {/* <Link className='px-3 py-2 text-2xl text-center' to='/checkout'> <HiOutlineShoppingCart /> </Link> */}
                    <Link className='px-4 py-2 text-2xl text-center' to='/checkout'>
                        <div className='relative block'>
                            <HiOutlineShoppingCart />
                            {cart.length > 0 && (
                                <span className='absolute -right-2 -bottom-3 text-red-500 text-base font-medium'>
                                    {cart.length}
                                </span>
                            )}
                        </div>
                    </Link>

                </div>
{/* //mobile menu */}
                <div className="lg:hidden fixed z-10 bottom-0 flex items-center justify-between shadow-bottomNavigation text-gray-700 body-font bg-white w-full h-14 sm:h-16 px-4 md:px-8">
                        <button className="flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"><HiMenuAlt1/></button>
                        <Link to='/'> <HiOutlineHome/> </Link>
                        <button className="flex-shrink-0"> <MdOutlineAccountCircle/> </button>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navigation