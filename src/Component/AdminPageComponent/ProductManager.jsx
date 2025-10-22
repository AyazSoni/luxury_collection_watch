import ProductList from '../../Component/AdminPageComponent/ProductList.jsx';
import EditProductForm from '../../Component/AdminPageComponent/EditProductForm.jsx';
import React, { useState } from 'react';

const ProductManager = () => {
  
  
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };


  const handleback = () => {
    setEditingProduct(null);
  }
  
  return(
    <div className="container mx-auto p-4">
      {editingProduct ? (
        <EditProductForm product={editingProduct} onBack={handleback} />
      ) : (
        <ProductList  onEdit={handleEdit}  />
      )}
    </div>
 
    );
}

export default ProductManager;