// src/components/admin/AdminPage.jsx
import React, { useState } from 'react';

import AddProductForm from '../../Component/AdminPageComponent/AddProductForm.jsx';
import ProductManager from '../../Component/AdminPageComponent/ProductManager.jsx';
import AddBannerPage from '../../Component/AdminPageComponent/AddBannerPage.jsx';
import AdminHomePage from '../../Component/AdminPageComponent/AdminHomePage.jsx';
import {Routes , Route} from "react-router-dom";

const AdminPage = () => {
  
  return (
   <Routes>
     <Route path="/" element={<AdminHomePage />}/>
     <Route path="Admin/AddProduct" element={<AddProductForm />}/>
     <Route path="productManager" element={<ProductManager />} />
     <Route path="addBanner" element={<AddBannerPage />} />
   </Routes>
  );
};

export default AdminPage;