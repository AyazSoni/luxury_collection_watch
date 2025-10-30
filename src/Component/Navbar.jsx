import React, { useState } from 'react';
import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useLocation, Link } from 'react-router-dom';

const Navbar = () => {
    let Links = [
        { name: "HOME", link: "/" },
        { name: "ContactUs", link: "/ContactUs" },
        { name: "All Products", link: "/ProductDisplay" },
    ];
    let [open, setOpen] = useState(false);

    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className='w-full fixed top-0 left-0 z-30 bg-white shadow-md'>
            <div className='md:flex items-center justify-between bg-gray-100 py-4 md:px-10 px-7 relative'>
                {/* logo section */}
                <div className='font-bold text-xl cursor-pointer flex items-center gap-1 z-40'>
                    <Link to="/" className="thick-font text-gray-800 hover:text-customGreen transition-colors">
                        Luxury Collection
                    </Link>
                </div>
                
                {/* Menu Press icon - Mobile only */}
                <div onClick={() => setOpen(!open)} className='absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer md:hidden w-7 h-7 z-40'>
                    {
                        open ? <XMarkIcon className="w-7 h-7" /> : <Bars3BottomRightIcon className="w-7 h-7" />
                    }
                </div>
                
                {/* link items */}
                <ul className={`md:flex md:items-center md:pb-0 pb-2 absolute md:static bg-gray-100 md:z-auto z-30 left-0 w-full md:w-auto md:pl-0 pl-9 pt-0 md:pt-0 transition-all duration-500 ease-in ${open ? 'top-full md:top-0' : 'top-[-490px] md:top-0'}`}>
                    {
                        Links.map((link) => {
                            const isActive = currentPath === link.link;
                            return (
                                <li key={link.name} className='md:ml-8 md:my-0 my-4 font-semibold'>
                                    <Link 
                                        to={link.link} 
                                        onClick={() => setOpen(false)}
                                        className={`text-gray-600 hover:text-customGreen duration-300 thick-font text-base ${isActive ? 'text-customGreen font-bold' : ''}`}
                                    >
                                        {link.name}
                                    </Link>
                                    <hr className="md:hidden mt-2 border-gray-300" />
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
