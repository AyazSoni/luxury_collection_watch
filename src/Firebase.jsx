import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL , deleteObject} from "firebase/storage";
import { getFirestore, collection, addDoc , getDocs , doc , deleteDoc , updateDoc , orderBy, query, where, limit, startAfter} from "firebase/firestore";
import { getAuth } from "firebase/auth";


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
const storage = getStorage(app);
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
      // Create an array of deletion promises
      const deletionPromises = images.map((imageUrl) => {
        const imageRef = ref(storage, imageUrl);
        return deleteObject(imageRef); // Returns a promise
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




//image 
export const deleteImageFromStorage = async (imageUrl) => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    throw new Error("Failed to delete image: " + error.message);
  }
};export const uploadImageToStorage = async (file, progressCallback) => {
  try {
    const storageRef = ref(storage, 'products/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload progress:", progress + "%");
          progressCallback(progress);  // Update progress state
        },
        (error) => {
          reject("Failed to upload image: " + error.message);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          } catch (error) {
            reject("Failed to get download URL: " + error.message);
          }
        }
      );
    });
  } catch (error) {
    throw new Error("Failed to upload image: " + error.message);
  }
};





//banner
const BANNER_PATH = 'banners/banner.jpg';

export const uploadBanner = async (file) => {
  try {
    const bannerRef = ref(storage, BANNER_PATH);
    await uploadBytesResumable(bannerRef, file);
    const downloadURL = await getDownloadURL(bannerRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading banner:', error);
    throw error;
  }
};
export const getCurrentBannerURL = async () => {
  try {
    const bannerRef = ref(storage, BANNER_PATH);
    const downloadURL = await getDownloadURL(bannerRef);
    return downloadURL;
  } catch (error) {
    console.error('Error fetching current banner:', error);
    return null;
  }
};
export const deleteCurrentBanner = async () => {
  try {
    const bannerRef = ref(storage, BANNER_PATH);
    await deleteObject(bannerRef);
  } catch (error) {
    console.error('Error deleting current banner:', error);
  }
};




//auth 

