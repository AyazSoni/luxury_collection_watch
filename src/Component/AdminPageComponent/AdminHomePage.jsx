import { RiArmchairFill } from "react-icons/ri";
import { BsCardList } from "react-icons/bs";
import { BsFillPostcardFill } from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import React, { useState, useEffect , useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx'; 

const AdminHomePage = () => {
    const Navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const [showDialog, setShowDialog] = useState(false);
    
    const NavigateTo = (key) => {
      Navigate(`/admin/${key}`);
    }
    
    const handlelogout = async () => {
      try {
       await logout(); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
    }
    
  return(
    <div className="flex flex-col justify-center items-center overflow-x-clip">
      
      <div className="thick-font  text-red-600  text-right w-full p-3 ">
        <button className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-2 rounded-2xl" onClick={() => setShowDialog(true)}>
          Log Out 
        </button>
      </div>
      
      <h1 className="text-3xl font-bold text-center mb-6 thick-font text-gray-700 my-4 md:text-5xl md:mb-12"> Welcome to Admin Panel !</h1>
      
      
      <div className="p-5 md:w-2/3">
        <button className="h-36 w-full bg-[#e6a39f] rounded-2xl pt-5 pl-3 flex shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]" onClick={() => NavigateTo('add-product')}>
          <p className="thick-font text-white text-3xl md:text-5xl md:whitespace-pre-wrap"> Add New Product </p>
          <RiArmchairFill  className="text-[200px] text-white  translate-y-[-25px]"/>
        </button>
      </div>
      
       <div className="p-5 md:w-2/3">
        <button className="h-36 w-full bg-[#7781a2] rounded-2xl pt-5 pl-3 flex shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] " onClick={ () => NavigateTo('product-manager')}>
          <p className="thick-font text-white text-3xl md:text-5xl md:whitespace-pre-wrap"> Manage  Product </p>
          <BsCardList  className="text-[180px] text-white translate-y-[-20px] translate-x-[-15px]"/>
        </button>
      </div>
      
      <div className="p-5 md:w-2/3">
        <button className="h-36 w-full bg-[#6eddca] rounded-2xl pt-5 pl-3 flex shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]" onClick={ () => NavigateTo('add-banner')}>
          <p className="thick-font text-white text-3xl md:text-5xl pr-4"> Add New Banner </p>
          <BsFillPostcardFill  className="text-[180px] text-white translate-y-[-20px] translate-x-[-15px]"/>
        </button>
      </div>
      
    {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[5]">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center mx-3">
            <h2 className="text-2xl mb-4">Are you sure you want to delete?</h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowDialog(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handlelogout}
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full transition duration-300 "
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    );
}

export default AdminHomePage;