// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../Firebase.jsx';
import { onAuthStateChanged , signOut } from 'firebase/auth';
import gif from '../Images/watch.gif';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null); // Update context state for logged-out user
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle errors appropriately, e.g., display an error message to the user
    }
  };

  if (loading) {
    return <div className="flex w-full  justify-center h-screen  items-center"><img src={gif} alt="loading" className="w-20 h-20"/></div>
  }

  return (
    <AuthContext.Provider value={{ currentUser , logout }}>
      {children}
    </AuthContext.Provider>
  );
};
