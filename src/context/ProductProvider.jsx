import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchProductsFromFirestore } from '../Firebase.jsx';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  // State for all fetched products (no duplicates)
  const [products, setProducts] = useState([]);
  
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state - track last document for each category
  const [lastDocs, setLastDocs] = useState({});
  
  // Pagination state - track if more data is available for each category
  const [hasMore, setHasMore] = useState({});
  
  // Track which categories have been fetched to avoid re-fetching
  const [fetchedCategories, setFetchedCategories] = useState({
    'latest': false,
    'all': false,
    "men": false,
    "women": false,
    "glasses": false,
    "trending": false
  });

  /**
   * Fetch products for a specific category with pagination
   * @param {string} category - Category to fetch products for
   */
  const fetchProducts = useCallback(async (category = "latest") => {
    try {
      setLoading(true);
      setError(null);

      // Get the last document for this category (null if first fetch)
      const lastDoc = lastDocs[category] || null;
      
      // Log if this is first request
      

      // Fetch products from Firestore
      const { products: newProducts, lastDoc: newLastDoc, hasMore: more } =
        await fetchProductsFromFirestore(category, lastDoc);

      // Log how many documents were fetched
      console.log(`📊 Fetched ${newProducts.length} documents for category: ${category}`);

      // Merge new products into state, avoiding duplicates
      setProducts((prevProducts) => {
        const existingIds = new Set(prevProducts.map((p) => p.id));
        const uniqueNewProducts = newProducts.filter((p) => !existingIds.has(p.id));
        return [...prevProducts, ...uniqueNewProducts];
      });

      // Update pagination state for this category
      setLastDocs((prev) => ({ ...prev, [category]: newLastDoc }));
      setHasMore((prev) => ({ ...prev, [category]: more }));
      
      // Mark this category as fetched
      if (!fetchedCategories[category]) {
      setFetchedCategories({...fetchedCategories, [category]: true});
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      setLoading(false);
    }
  }, [lastDocs]);

  /**
   * Get products filtered by category
   * @param {string} category - Category to filter by
   * @returns {Array} Filtered products array
   */
  const getProductsByCategory = useCallback((category) => {
    if (category === "latest" || category === "all") {
      // Return all products sorted by creation date (no slice here)
      return [...products]
        .sort((a, b) => b.createdAt - a.createdAt);
    }
    
    if (category === "trending") {
      return products.filter((p) => p.trending === true);
    }
    
    // Return products filtered by specific category
    return products.filter((p) => p.category === category);
  }, [products]);

  /**
   * Get a single product by its ID
   * @param {string} id - Product ID
   * @returns {Object|null} Product object or null if not found
   */
  const getProductById = useCallback((id) => {
    return products.find(product => product.id === id) || null;
  }, [products]);

  /**
   * Get products with similar category (max 5)
   * @param {string} id - Product ID to find similar products for
   * @returns {Array} Array of similar products
   */
  const getProductWithSimilarCategory = useCallback((id) => {
    if (loading || !products.length) {
      return [];
    }

    // Find the target product
    const targetProduct = products.find(product => product.id === id);
    
    if (!targetProduct) {
      return [];
    }

    // Get products with the same category (excluding the target product)
    let similarProducts = products.filter(product => 
      product.category === targetProduct.category && 
      product.id !== id
    );
    
    // If we have enough similar products, return top 5
    if (similarProducts.length >= 5) {
      return similarProducts.slice(0, 5);
    }

    // If not enough similar products, get any other products (excluding target)
    const otherProducts = products.filter(product => product.id !== id);
    
    // Combine similar products with other products to reach 5 total
    const combined = [...similarProducts, ...otherProducts];
    return combined.slice(0, 5);
  }, [products, loading]);

  /**
   * Get the 3 newest products
   * @returns {Array} Array of 3 newest products
   */
  const getNewestProducts = useCallback(() => {
    if (loading || !products.length) {
      return [];
    }

    return [...products]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 3);
  }, [products, loading]);

  /**
   * Get trending products
   * @returns {Array} Array of trending products
   */
  const getTrendingProducts = useCallback(() => {
    if (loading || !products.length) {
      return [];
    }

    return products.filter(product => product.trending === true);
  }, [products, loading]);

  /**
   * Refresh products by clearing cache and refetching
   * @param {string} category - Category to refresh (default: "latest")
   */
  const refreshProducts = useCallback(async (category = "latest") => {
    try {
      setLoading(true);
      setError(null);

      // Clear existing products and pagination state
      setProducts([]);
      setLastDocs({});
      setHasMore({});
      setFetchedCategories({
        'latest': false,
        'all': false,
        "men": false,
        "women": false,
        "glasses": false,
        "trending": false
      });

      // Fetch fresh products
      const { products: newProducts, lastDoc: newLastDoc, hasMore: more } =
        await fetchProductsFromFirestore(category, null);

      setProducts(newProducts);
      setLastDocs({ [category]: newLastDoc });
      setHasMore({ [category]: more });
      setFetchedCategories(prev => ({ ...prev, [category]: true }));

      setLoading(false);
    } catch (err) {
      console.error('Error refreshing products:', err);
      setError(err.message);
      setLoading(false);
    }
  }, []);



  // Fetch "latest" products when provider first mounts
  useEffect(() => {
    console.log("fetchedCategories" , fetchedCategories);
    if(!fetchedCategories["latest"]) {
      console.log("fetching latest products");
    fetchProducts("latest");
    }
  }, []); // Empty dependency array - only run once on mount

  // Context value
  const contextValue = {
    // State
    products,
    loading,
    error,
    hasMore,
    fetchedCategories,
    // Actions
    fetchProducts,
    refreshProducts,
    
    // Helper functions
    getProductsByCategory,
    getProductById,
    getProductWithSimilarCategory,
    getNewestProducts,
    getTrendingProducts,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
