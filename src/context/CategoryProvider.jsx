import React, { createContext, useState, useContext  , useEffect} from 'react';

const CategoryContext = createContext();

export const useCategory = () => useContext(CategoryContext);


export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
   useEffect(() => {
     console.log(selectedCategory);
   } , [selectedCategory]);
   
  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
