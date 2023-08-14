import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import AuthContext from '../../hooks/AuthContext'
import { logout } from '../../firebase'


import { HiMenuAlt1, HiOutlineHome, HiOutlineShoppingCart } from 'react-icons/hi'
import { MdOutlineAccountCircle,  } from 'react-icons/md'
import logo from '../../logo.png'

const Navigation = () => {
    const { user } = React.useContext(AuthContext); // Get the user from AuthContext
    

    const handleLogout = async () => {
        try {
            await logout();
            console.log("Successfully logged out!");
            // Optional: redirect or update state/UI here
        } catch (error) {
            console.error("Error logging out: ", error.message);
        }
    };


    const links = [
        { label: 'Home', path: '/' },
        { label: 'Shop', path: '/shop' },
        { label: 'Man', path: '/shop/man' },
        { label: 'Woman', path: '/shop/woman' },
        { label: 'About', path: '/about' },
        { label: 'Contact', path: '/contact' },
        // { label: 'Sign In', path: '/signin' },
        // { label: 'Sign Up', path: '/signup' },
      ];

  return (
    <nav className="relative z-20 w-full h-40 sm:h-20 lg:h-24">
        <div className="fixed z-20 w-full  px-4 text-gray-700 transition duration-200 ease-in-out bg-white innerSticky body-font sm:h-18  md:px-8 lg:px-2.5">
            <div className="flex items-center justify-center mx-auto max-w-[1920px] h-full w-full">

                <Link to='/'> <img className='inline-flex focus:outline-none lg:pr-10 h-full' alt="Logo" src={logo} /> </Link>

                <ul className="w-full relative hidden lg:flex ltr:md:ml-6 rtl:md:mr-6 ltr:xl:ml-10 rtl:xl:mr-10 py-7">
                    {links.map((link) => (
                    <li className='relative inline-flex items-center px-3 py-2 text-sm font-normal xl:text-base text-heading xl:px-4 group-hover:text-black' key={link.path}>
                        <NavLink to={link.path}>{link.label}</NavLink>
                    </li>
                    ))}
                </ul>
            {/* //mobile menu */}
                <div className="lg:hidden fixed z-10 bottom-0 flex items-center justify-between shadow-bottomNavigation text-gray-700 body-font bg-white w-full h-14 sm:h-16 px-4 md:px-8">
                        <button className="flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"><HiMenuAlt1/></button>
                        <Link to='/'> <HiOutlineHome/> </Link>
                        <button className="flex-shrink-0"> <MdOutlineAccountCircle/> </button>


                </div>


                <div className='lg:flex hidden ltr:md:ml-6 rtl:md:mr-6 ltr:xl:ml-10 rtl:xl:mr-10 py-7'>
                    <Link className='px-3 py-2' to='/cart'> <HiOutlineShoppingCart /> </Link>
                    <Link className='px-3 py-2' to='/account'> <MdOutlineAccountCircle /> </Link>
                    {user ? ( // If user is logged in, show logout button
                        <button className='px-3 py-2' onClick={handleLogout}> Logout </button>
                        ) : (
                        // If user is not logged in, show login and register buttons
                    <>
                        <Link className='px-3 py-2' to='/login'> Login </Link>
                        <Link className='px-3 py-2' to='/signup'> Register </Link>
                    </>
                        )}
                    { user && user.uid === 'gwCvu8CwOCToe2owDmtKEHm7Cvj2' ? (
                        <Link className='px-3 py-2' to='/upload'> Upload </Link>
                    ) : (
                        null
                    )}
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navigation