import React, { useState } from 'react';
import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useLocation, Link } from 'react-router-dom';

const Navbar = () => {
    let Links = [
        { name: "HOME", link: "/" },
        { name: "AboutUs", link: "/AboutUs" },
        { name: "Shop", link: "/Shop" },
        { name: "ContactUs", link: "/ContactUs" },
        { name: "All Products", link: "/ProductDisplay" },
    ];
    let [open, setOpen] = useState(false);

    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className='w-full fixed top-0 left-0 z-20'>
            <div className='md:flex items-center justify-between bg-gray-100 py-4 md:px-10 px-7'>
                {/* logo section */}
                <div className='font-bold text-xl cursor-pointer flex items-center gap-1'>
                    <span className="thick-font">Luxury Collection</span>
                </div>
                {/* Menu icon */}
                <div onClick={() => setOpen(!open)} className='absolute right-8 bottom-4 cursor-pointer md:hidden w-7 h-7'>
                    {
                        open ? <XMarkIcon /> : <Bars3BottomRightIcon />
                    }
                </div>
                {/* link items */}
                <ul className={`md:flex md:items-center md:pb-0 pb-2 absolute md:static bg-gray-100 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
                    {
                        Links.map((link) => {
                            const isActive = currentPath === link.link;
                            return (
                                <li key={link.name} className='md:ml-8 md:my-0 my-6 font-semibold'>
                                    <Link to={link.link} className={`text-gray-600 hover:text-gray-800 duration-500 thick-font ${isActive ? 'text-blue-500' : ''}`}>
                                        {link.name}
                                    </Link>
                                    <hr />
                                </li>
                            );
                        })
                    }
                </ul>

                {/* button */}
            </div>
        </div>
    );
};

export default Navbar;
