// src/App.jsx

import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import AboutUs from './Pages/AboutUs.jsx';
import Shop from './Pages/Shop.jsx';
import ContactUs from './Pages/ContactUs.jsx';
import ProductDisplay from './Pages/ProductDisplay.jsx';
import MainProductPage from './Pages/MainProductPage.jsx';

import AddProductForm from './Component/AdminPageComponent/AddProductForm.jsx';
import ProductManager from './Component/AdminPageComponent/ProductManager.jsx';
import AddBannerPage from './Component/AdminPageComponent/AddBannerPage.jsx';
import AdminHomePage from './Component/AdminPageComponent/AdminHomePage.jsx';
import LoginPage from './Component/AdminPageComponent/AdminLoginForm.jsx';

import { AuthProvider } from './context/AuthContext.jsx';
import { CategoryProvider } from './context/CategoryProvider.jsx';
import { ProductProvider } from './context/ProductProvider.jsx';

import PrivateRoute from './Component/PrivateRoute.jsx';

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CategoryProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
           <Route path="/Shop" element={<Shop />} />
           <Route path="/ContactUs" element={<ContactUs />} />
           <Route path="/ProductDisplay" element={<ProductDisplay />}/>
           <Route path="/MainProductPage/:productId" element={<MainProductPage />} />
           
          
          
          {/* Admin Page */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin"  element={<AdminHomePage />} />
          <Route path="/admin/add-product" element={<AddProductForm />} />
          <Route path="/admin/product-manager" element={<ProductManager />} />
          <Route path="/admin/add-banner" element={<AddBannerPage />} />
          
          </Route>
        </Routes>
        </CategoryProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
