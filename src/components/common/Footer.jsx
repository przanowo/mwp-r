import React from 'react';
import { Link } from 'react-router-dom';
import { IoLogoInstagram } from 'react-icons/io5';
import { FaFacebook } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className='flex-shrink-0 border-b-4 border-heading mt-9 md:mt-11 lg:mt-16 3xl:mt-20 pt-2.5 lg:pt-0 2xl:pt-2 items-end bg-white/75'>
        <div className='mx-auto max-w-[1920px] px-4 md:pb-1 lg:pt-6 2xl:pb-8 items-end'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-9 xl:gap-5 pb-9 md:pb-14 lg:pb-6 2xl:pb-6 3xl:pb-16 lg:mb-0.5 2xl:mb-0 3xl:-mb-1 xl:grid-cols-6 '>
            <div className='pb-1 md:pb-0 undefined'>
              <h4 className='mb-5 text-sm font-semibold text-heading md:text-base xl:text-lg 2xl:mb-6 3xl:mb-7'>
                Social
              </h4>
              <ul className='text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5'>
                <li className='flex items-baseline'>
                  <span className='ltr:mr-3 rtl:ml-3 relative top-0.5 lg:top-1 text-sm lg:text-base'>
                    <IoLogoInstagram />
                  </span>
                  <Link to='https://www.instagram.com/gyongyikonyves_miniparfumqueen/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA=='>
                    Instagram
                  </Link>
                </li>
                <li className='flex items-baseline'>
                  <span className='ltr:mr-3 rtl:ml-3 relative top-0.5 lg:top-1 text-sm lg:text-base'>
                    <FaFacebook />
                  </span>
                  <Link to='www.Instagram.com'>Facebook</Link>
                </li>
                <li className='flex items-baseline'>
                  <span className='ltr:mr-3 rtl:ml-3 relative top-0.5 lg:top-1 text-sm lg:text-base'>
                    <IoLogoYoutube />
                  </span>
                  <Link to='www.Instagram.com'>Youtube</Link>
                </li>
                {/* <li className="flex items-baseline">
                            <span className='ltr:mr-3 rtl:ml-3 relative top-0.5 lg:top-1 text-sm lg:text-base'><AiFillTwitterCircle/></span> 
                            <Link to='www.Instagram.com'>Twitter</Link>
                        </li> */}
              </ul>
            </div>

            <div className='pb-3 md:pb-0 undefined'>
              <h4 className='mb-5 text-sm font-semibold text-heading md:text-base xl:text-lg 2xl:mb-6 3xl:mb-7'>
                Contact
              </h4>
              <ul className='text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5'>
                <li className='flex items-baseline'>
                  <Link to='/contact'>Contact</Link>
                </li>
                <li className='flex items-baseline'>
                  <p>yourexample@email.com</p>
                </li>
                <li className='flex items-baseline'>
                  <p>+1 234 567 89 00</p>
                </li>
              </ul>
            </div>

            <div className='pb-3 md:pb-0 undefined'>
              <h4 className='mb-5 text-sm font-semibold text-heading md:text-base xl:text-lg 2xl:mb-6 3xl:mb-7'>
                About
              </h4>
              <ul className='text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5'>
                <li className='flex items-baseline'>
                  <Link to='/about'>About Us</Link>
                </li>
                <li className='flex items-baseline'>
                  <Link to='/contact'>Support</Link>
                </li>
                {/* <li className="flex items-baseline">
                            <Link to='/about'>Copyright</Link>
                        </li> */}
              </ul>
            </div>

            <div className='pb-3 md:pb-0 undefined'>
              <h4 className='mb-5 text-sm font-semibold text-heading md:text-base xl:text-lg 2xl:mb-6 3xl:mb-7'>
                FAQ
              </h4>
              <ul className='text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5'>
                <li className='flex items-baseline'>
                  <Link to='/faq'>FAQ & Help</Link>
                </li>
                <li className='flex items-baseline'>
                  <Link to='/faq'>Shipping & Delivery</Link>
                </li>
                <li className='flex items-baseline'>
                  <Link to='/faq'>Return & Exchanges</Link>
                </li>
              </ul>
            </div>

            <div className='pb-3 md:pb-0 undefined'>
              <h4 className='mb-5 text-sm font-semibold text-heading md:text-base xl:text-lg 2xl:mb-6 3xl:mb-7'>
                Our Information
              </h4>
              <ul className='text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5'>
                <li className='flex items-baseline'>
                  <Link to='/privacy'>Privacy policy</Link>
                </li>
                <li className='flex items-baseline'>
                  <Link to='/terms'>Terms & conditions</Link>
                </li>
              </ul>
            </div>

            <div className='pb-3 md:pb-0 undefined'>
              <h4 className='mb-5 text-sm font-semibold text-heading md:text-base xl:text-lg 2xl:mb-6 3xl:mb-7'>
                Connected Shops
              </h4>
              <ul className='text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5'>
                <li className='flex items-baseline'>
                  <Link to='www.ebay.com'>Ebay</Link>
                </li>
                <li className='flex items-baseline'>
                  <Link to='www.etsy.com'>Etsy</Link>
                </li>
                <li className='flex items-baseline'>
                  <Link to='www.amazon.com'>Amazon</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='text-sm text-black p-2 text-center'>
          &copy; {currentYear} Mini Parfum Queen. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
