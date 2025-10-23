import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc , getDocs , doc , deleteDoc , updateDoc , orderBy, query, where, limit, startAfter} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { uploadFileToSupabase, deleteFileFromSupabase, uploadBannerToSupabase, getCurrentBannerFromSupabase, deleteCurrentBannerFromSupabase } from './Supabase.jsx';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVWSp45Rv9CJci-2roMOLvKIApmuSywNs",
  authDomain: "luxury-collections.firebaseapp.com",
  projectId: "luxury-collections",
  storageBucket: "luxury-collections.firebasestorage.app",
  messagingSenderId: "660270255656",
  appId: "1:660270255656:web:b415ef78524940b6726f1d",
  measurementId: "G-1L2EGPQ97C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const auth = getAuth(app);
export { auth };

//products crud
export const addProductToFirebase = async (productData) => {
  try {
    await addDoc(collection(firestore, "products"), productData);
  } catch (error) {
    throw new Error("Failed to add product: " + error.message);
  }
};
export const deleteProductFromFirebase = async (productId, images) => {
  try {
    if (images && images.length > 0) {
      // Create an array of deletion promises using Supabase
      const deletionPromises = images.map((imageUrl) => {
        return deleteFileFromSupabase(imageUrl);
      });

      // Wait until all deletion promises are resolved
      await Promise.all(deletionPromises);
    }
    // Proceed to delete the document after all images are deleted
    await deleteDoc(doc(firestore, "products", productId));
  } catch (error) {
    throw new Error("Failed to delete product: " + error.message);
  }
};

/**
 * Fetch products from Firestore with pagination support
 * @param {string} category - Category to filter by, "latest" for all products
 * @param {DocumentSnapshot} lastDoc - Last document for pagination
 * @returns {Object} Object containing products array, lastDoc, and hasMore flag
 */
export async function fetchProductsFromFirestore(category = "latest", lastDoc = null) {
  try {
    let q;
    
    if (category === "latest") {
      // Fetch all products ordered by creation date (newest first)
      q = query(
        collection(firestore, "products"),
        orderBy("createdAt", "desc"),
        ...(lastDoc ? [startAfter(lastDoc)] : []),
        limit(10)
      );
    } else {
      // Fetch products filtered by specific category (without orderBy to avoid index requirement)
      q = query(
        collection(firestore, "products"),
        where("category", "==", category),
        ...(lastDoc ? [startAfter(lastDoc)] : []),
        limit(10)
      );
    }

    const snap = await getDocs(q);
    console.log(`🔥 Firebase query result - Category: ${category}, Documents: ${snap.docs.length}, LastDoc: ${lastDoc ? 'exists' : 'null'}`);

    let products = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    console.log(`📦 Mapped products:`, products.map(p => ({ id: p.id, name: p.name, category: p.category })));

    // Sort by createdAt for category queries (since we removed orderBy from query)
    if (category !== "latest") {
      products = products.sort((a, b) => b.createdAt - a.createdAt);
    }

    return {
      products,
      lastDoc: snap.docs[snap.docs.length - 1] || null,
      hasMore: snap.docs.length === 10,
    };
  } catch (error) {
    console.error('Error fetching products from Firestore:', error);
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}


export const updateProductInFirestore = async (productId, updatedData) => {
  try {
    const productRef = doc(firestore , 'products', productId);
    await updateDoc(productRef, updatedData);
  } catch (error) {
    console.error('Error updating product: ', error);
    throw error;
  }
};




//image functions using Supabase
export const deleteImageFromStorage = async (imageUrl) => {
  try {
    await deleteFileFromSupabase(imageUrl);
  } catch (error) {
    throw new Error("Failed to delete image: " + error.message);
  }
};

export const uploadImageToStorage = async (file, progressCallback, productData = null) => {
  try {
    return await uploadFileToSupabase(file, progressCallback, productData);
  } catch (error) {
    throw new Error("Failed to upload image: " + error.message);
  }
};





//banner functions using Supabase and Firestore
export const uploadBanner = async (file, bannerData) => {
  try {
    let imageUrl = null;

    // Upload image to Supabase only if a file is provided
    if (file) {
      imageUrl = await uploadBannerToSupabase(file);
    }

    // Check if banner document already exists
    const bannersCollection = collection(firestore, 'banners');
    const bannerQuery = query(bannersCollection, limit(1));
    const existingBanners = await getDocs(bannerQuery);

    // Prepare banner metadata
    const bannerMetadata = {
      title: bannerData.title || '',
      description: bannerData.description || '',
      productId: bannerData.productId || null,
      updatedAt: new Date()
    };

    // Add imageUrl only if a new file was uploaded
    if (imageUrl) {
      bannerMetadata.imageUrl = imageUrl;
    }

    if (!existingBanners.empty) {
      // Update existing banner
      const bannerDoc = existingBanners.docs[0];
      await updateDoc(doc(firestore, 'banners', bannerDoc.id), bannerMetadata);

      // Return existing imageUrl if no new file was uploaded
      if (!imageUrl) {
        const existingData = bannerDoc.data();
        imageUrl = existingData.imageUrl;
      }
    } else {
      // Create new banner document
      if (!imageUrl) {
        throw new Error('Image is required for new banner');
      }
      bannerMetadata.createdAt = new Date();
      await addDoc(bannersCollection, bannerMetadata);
    }

    return imageUrl;
  } catch (error) {
    console.error('Error uploading banner:', error);
    throw error;
  }
};

export const getCurrentBannerData = async () => {
  try {
    const bannersCollection = collection(firestore, 'banners');
    const bannerQuery = query(bannersCollection, limit(1));
    const bannerSnapshot = await getDocs(bannerQuery);

    if (!bannerSnapshot.empty) {
      const bannerDoc = bannerSnapshot.docs[0];
      return {
        id: bannerDoc.id,
        ...bannerDoc.data()
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching current banner data:', error);
    return null;
  }
};

export const getCurrentBannerURL = async () => {
  try {
    const bannerData = await getCurrentBannerData();
    return bannerData?.imageUrl || await getCurrentBannerFromSupabase();
  } catch (error) {
    console.error('Error fetching current banner:', error);
    return null;
  }
};

export const deleteCurrentBanner = async () => {
  try {
    // Delete from Supabase storage
    await deleteCurrentBannerFromSupabase();

    // Delete from Firestore
    const bannersCollection = collection(firestore, 'banners');
    const bannerQuery = query(bannersCollection, limit(1));
    const bannerSnapshot = await getDocs(bannerQuery);

    if (!bannerSnapshot.empty) {
      const bannerDoc = bannerSnapshot.docs[0];
      await deleteDoc(doc(firestore, 'banners', bannerDoc.id));
    }
  } catch (error) {
    console.error('Error deleting current banner:', error);
    throw error;
  }
};




//auth 

