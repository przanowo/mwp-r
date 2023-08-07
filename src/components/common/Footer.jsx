import React from 'react'
import { Link } from 'react-router-dom'
import { IoLogoInstagram } from 'react-icons/io5'
import { FaFacebook, } from 'react-icons/fa'
import { IoLogoYoutube } from 'react-icons/io'  
import { AiFillTwitterCircle } from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className='border-b-4 border-heading mt-9 md:mt-11 lg:mt-16 3xl:mt-20 pt-2.5 lg:pt-0 2xl:pt-2'>
        <div className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-9 xl:gap-5  pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24 lg:mb-0.5 2xl:mb-0 3xl:-mb-1 xl:grid-cols-6 ">
                <div className="pb-3 md:pb-0 undefined">
                    <h4 className="mb-5 text-sm font-semibold text-heading md:text-base xl:text-lg 2xl:mb-6 3xl:mb-7">Social</h4>
                    <ul className="text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5">
                        <li className="flex items-baseline">
                            <span className='ltr:mr-3 rtl:ml-3 relative top-0.5 lg:top-1 text-sm lg:text-base'><IoLogoInstagram/></span> 
                            <Link to='www.Instagram.com'>Instagram</Link>
                        </li>
                        <li className="flex items-baseline">
                            <span className='ltr:mr-3 rtl:ml-3 relative top-0.5 lg:top-1 text-sm lg:text-base'><FaFacebook/></span> 
                            <Link to='www.Instagram.com'>Facebook</Link>
                        </li>
                        <li className="flex items-baseline">
                            <span className='ltr:mr-3 rtl:ml-3 relative top-0.5 lg:top-1 text-sm lg:text-base'><IoLogoYoutube/></span> 
                            <Link to='www.Instagram.com'>Youtube</Link>
                        </li>
                        <li className="flex items-baseline">
                            <span className='ltr:mr-3 rtl:ml-3 relative top-0.5 lg:top-1 text-sm lg:text-base'><AiFillTwitterCircle/></span> 
                            <Link to='www.Instagram.com'>Twitter</Link>
                        </li>
                    </ul>
                </div>

                <div className="pb-3 md:pb-0 undefined">
                    <h4 className="mb-5 text-sm font-semibold text-heading md:text-base xl:text-lg 2xl:mb-6 3xl:mb-7">Contact</h4>
                    <ul className="text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5">
                        <li className="flex items-baseline">
                            <Link to='/contact'>Contact</Link>
                        </li>
                        <li className="flex items-baseline">
                            <p>yourexample@email.com</p>
                        </li>
                        <li className="flex items-baseline">
                            <p>+1 234 567 89 00</p>
                        </li>
                    </ul>
                </div>

                <div className="pb-3 md:pb-0 undefined">
                    <h4 className="mb-5 text-sm font-semibold text-heading md:text-base xl:text-lg 2xl:mb-6 3xl:mb-7">About</h4>
                    <ul className="text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5">
                        <li className="flex items-baseline">
                            <Link to='/about'>About Us</Link>
                        </li>
                        <li className="flex items-baseline">
                            <Link to='/contact'>Support</Link>
                        </li>
                        <li className="flex items-baseline">
                            <Link to='/about'>Copyright</Link>
                        </li>
                    </ul>
                </div>

                <div className="pb-3 md:pb-0 undefined">
                    <h4 className="mb-5 text-sm font-semibold text-heading md:text-base xl:text-lg 2xl:mb-6 3xl:mb-7">FAQ</h4>
                    <ul className="text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5">
                        <li className="flex items-baseline">
                            <Link to='/faq'>FAQ & Help</Link>
                        </li>
                        <li className="flex items-baseline">
                            <Link to='/faq'>Shipping & Delivery</Link>
                        </li>
                        <li className="flex items-baseline">
                            <Link to='/faq'>Return & Exchanges</Link>
                        </li>
                    </ul>
                </div>

                <div className="pb-3 md:pb-0 undefined">
                    <h4 className="mb-5 text-sm font-semibold text-heading md:text-base xl:text-lg 2xl:mb-6 3xl:mb-7">Our Information</h4>
                    <ul className="text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5">
                        <li className="flex items-baseline">
                            <Link to='/privacy'>Privacy policy update</Link>
                        </li>
                        <li className="flex items-baseline">
                            <Link to='/terms'>Terms & conditions</Link>
                        </li>
                        <li className="flex items-baseline">
                            <Link to='/copyright'>Return Policy</Link>
                        </li>
                    </ul>
                </div>   

                <div className="pb-3 md:pb-0 undefined">
                    <h4 className="mb-5 text-sm font-semibold text-heading md:text-base xl:text-lg 2xl:mb-6 3xl:mb-7">Connected Shops</h4>
                    <ul className="text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5">
                        <li className="flex items-baseline">
                            <Link to='www.ebay.com'>Ebay</Link>
                        </li>
                        <li className="flex items-baseline">
                            <Link to='www.etsy.com'>Etsy</Link>
                        </li>
                        <li className="flex items-baseline">
                            <Link to='www.amazon.com'>Amazon</Link>
                        </li>
                    </ul>
                </div> 

            </div>
        </div>
    </footer>
  )
}

export default Footer