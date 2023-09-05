import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../../hooks/AuthContext'
import { logout } from '../../firebase'
// import Search from '../product/Search'
import { HiMenuAlt1, HiOutlineHome, HiOutlineShoppingCart } from 'react-icons/hi'
import { MdOutlineAccountCircle,  } from 'react-icons/md'
import logoblack from '../../logoblack.png'
import logowhite from '../../logowhite.png'
// import { useSearch } from '../../hooks/SearchContext';

const Navigation = () => {
    const { user } = React.useContext(AuthContext); // Get the user from AuthContext
    const [scrolled, setScrolled] = useState(false);
    // const [hovered, setHovered] = useState(false);
    // const { setSearchTerm } = useSearch();

    const handleLogout = async () => {
        try {
            await logout();
            console.log("Successfully logged out!");
            // Optional: redirect or update state/UI here
        } catch (error) {
            console.error("Error logging out: ", error.message);
        }
    };

    useEffect(() => {
        let startedScrolling = false;
        const handleScroll = () => {
            const snapContainer = document.querySelector('.snap-y');
            const offset = snapContainer.scrollTop;
            if (offset > 0 && !startedScrolling) {
                setScrolled(true);
            }

            if (offset === 0) {
                setScrolled(false);
                startedScrolling = false;
            }
        };

        // Attach the scroll listener
        const snapContainer = document.querySelector('.snap-y');
        snapContainer.addEventListener('scroll', handleScroll);

        // Cleanup
        return () => {
            snapContainer.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const logoSrc = scrolled ? logoblack : logowhite;
    const fixedLogoClasses = `${logoSrc}`;
    const navbarClasses = scrolled ? 'bg-white text-black' : 'text-white';
    const fixedNavbarClasses = `lg:fixed z-20 w-screen px-4 transition duration-200 ease-in-out sm:h-18 md:px-8 lg:px-2.5 ${navbarClasses}`;

    // const links = [
    //     // { label: 'Home', path: '/' },
    //     { label: 'Shop', path: '/shop' },
    //     // { label: 'Man', path: '/man' },
    //     // { label: 'Woman', path: '/woman' },
    //     // { label: 'Vintage', path: '/shop/vintage' },
    //     // { label: 'Miniature', path: '/miniature' },
    //     // { label: 'Sample', path: '/sample' },
    //     // { label: 'About', path: '/about' },
    //     // { label: 'Contact', path: '/contact' },
    //     // { label: 'Sign In', path: '/signin' },
    //     // { label: 'Sign Up', path: '/signup' },
    //   ];

  return (
    <nav 
        className="lg: absolute z-20 h-26 sm:h-20 lg:h-20 overflow-hidden lg:mb-6"
        // onMouseEnter={() => ksetHovered(true)} // When mouse enters
        // onMouseLeave={() => setHovered(false)} // When mouse leaves
        >
        <div className={fixedNavbarClasses}>
            <div className="flex items-center justify-center lg:justify-between max-w-screen h-full w-full">
                <Link to='/'> <img className='max-h-24 md:max-h-24 lg:max-h-16 inline-flex focus:outline-none lg:pr-10 ' alt="Logo" src={fixedLogoClasses} /> </Link>

{/* //desktop menu */}
                <div className="flex text-center items-center">
                    <Link className='px-3 py-2 rounded-lg hover:bg-white/20 hover:text-lg' to='/shop'> Shop </Link>
                    <Link className='px-3 py-2 rounded-lg hover:bg-white/20 hover:text-lg' to='/shop/vintage'> Vintage </Link>
                    <Link className='px-3 py-2 rounded-lg hover:bg-white/20 hover:text-lg' to='/shop/parfum'> Perfume </Link>
                    <Link className='px-3 py-2 rounded-lg hover:bg-white/20 hover:text-lg' to='/shop/miniature'> Miniature </Link>
                    <Link className='px-3 py-2 rounded-lg hover:bg-white/20 hover:text-lg' to='/shop/sample'> Sample </Link>
                    <Link className='px-3 py-2 rounded-lg hover:bg-white/20 hover:text-lg' to='/shop/soapandpowder'> Soap & Powder </Link>
                    <Link className='px-3 py-2 rounded-lg hover:bg-white/20 hover:text-lg' to='/shop/gift'> Gifts </Link>
                    <Link className='px-3 py-2 rounded-lg hover:bg-white/20 hover:text-lg' to='/shop/'> Search </Link>
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
                    <Link className='px-3 py-2 text-2xl text-center' to='/checkout'> <HiOutlineShoppingCart /> </Link>
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