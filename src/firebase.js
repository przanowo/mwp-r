import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { getFirestore,
  addDoc,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  limit,
  orderBy,
  startAfter


} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

export const copyProductsAndAddField = async () => {
  try {
    // Fetch all products from the source collection
    const sourceCollectionPath = 'products/miniatureB/product';
    const sourceCollectionRef = collection(firestore, sourceCollectionPath);
    const sourceSnapshot = await getDocs(sourceCollectionRef);

    // Copy each product to the destination collection
    const destinationCollectionPath = 'products/miniature/product';
    sourceSnapshot.forEach(async (docSnapshot) => {
      const productData = docSnapshot.data();
      // Add a new boolean field 'box' with value 'true'
      productData.box = true;

      // Add the product data to the destination collection
      await addDoc(collection(firestore, destinationCollectionPath), productData);
    });
    
    return { success: true, message: 'Products copied successfully!' };
  } catch (error) {
    console.error("Error copying products:", error);
    return { success: false, message: error.message };
  }
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(firestore, 'users', userAuth.uid);
  // console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);
  // console.log(userSnapshot.exists());

  //is userdata not exists
  //create / set doc with data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(error, 'error creat user');
    }
  }
  return userDocRef;
  //is userdata exists
  //return userdata
};
export const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
};
export const signInWithEmailPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
export const signUpWithEmailPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password); // Return the Promise here
  };
export const sendPassResetEmail = (email) => {
    return sendPasswordResetEmail(auth, email);
};
export const logout = () => {
  return signOut(auth);
};
export const fetchUserDetails = async (userId) => {
  try {
    const userDocRef = doc(firestore, 'users', userId);
    const userSnapshot = await getDoc(userDocRef);
    
    if (userSnapshot.exists()) {
      return { success: true, data: userSnapshot.data(), message: 'User details fetched successfully!' };
    } else {
      throw new Error('User not found in Firestore.');
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    return { success: false, message: error.message };
  }
};
export const updateUserDetails = async (userId, details) => {
  const userDocRef = doc(firestore, 'users', userId);

  try {
    await setDoc(userDocRef, details, { merge: true });
    return { success: true, message: 'User details updated successfully!' };
  } catch (error) {
    console.error("Error updating user details:", error);
    return { success: false, message: error.message };
  }
};
export const addProductToFirestore = async (product) => {
  try {
    await addDoc(collection(firestore, 'products', product.category, 'product'), product);
    console.log('product', product)
    return { success: true, message: 'Product added successfully!' };
  } catch (error) {
    console.error("Error adding product:", error);
    return { success: false, message: error.message };
  }
};
export const uploadImage = async (file, folderName) => {

  // Create a unique filename: current timestamp + original file name
  const uniqueFilename = `${Date.now()}-${file.name}`;


  const storageRef = ref(storage, `${folderName}/${uniqueFilename}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed',
      (snapshot) => {
        // Handle progress
      },
      (error) => {
        // Handle error
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};
export const fetchProductsFromFirestore = async (lastVisibleProducts = {}) => {
  const productCategories = ['vintage', 'miniature', 'sample', 'parfum', 'gold', 'powder', 'gift', 'soap'];
  const allProducts = {};
  const newLastVisibleProducts = {};

  for (const category of productCategories) {
    let q = query(
      collection(firestore, 'products', category, 'product'),
      orderBy('title', 'desc'),
      limit(4)
    );
    if (lastVisibleProducts[category]) {
      q = query(
        collection(firestore, 'products', category, 'product'),
        orderBy('title', 'desc'),
        startAfter(lastVisibleProducts[category]),
        limit(4)
      );
    }

    const querySnapshot = await getDocs(q);
    allProducts[category] = {};
    querySnapshot.forEach(doc => {
      allProducts[category][doc.id] = doc.data();
    });
    newLastVisibleProducts[category] = querySnapshot.docs[querySnapshot.docs.length - 1];
  }

  return {
    allProducts,
    lastVisible: newLastVisibleProducts
  };
};

export const fetchProductFromFirestore = async (category, productId)  => {
  const productRef = doc(firestore, 'products', category, 'product', productId);
  const productDoc = await getDoc(productRef);

  if (!productDoc.exists) {
      return null;
  }

  return {
      id: productDoc.id,
      ...productDoc.data(),
  };
}


export const fetchProductsByCategoryFromFirestore = async (category, lastVisibleProduct = null) => {
  let q = query(
    collection(firestore, 'products', category, 'product'),
    orderBy('title', 'desc'),
    limit(10)
  );
  if (lastVisibleProduct) {
    q = query(
      collection(firestore, 'products', category, 'product'),
      orderBy('title', 'desc'),
      startAfter(lastVisibleProduct),
      limit(10)
    );
  }
  const querySnapshot = await getDocs(q);
  const products = {};
  querySnapshot.forEach(doc => {
    products[doc.id] = doc.data();
  });
  const lastProduct = querySnapshot.docs[querySnapshot.docs.length - 1];
  return {
    products,
    lastProduct,
  };
};

export const addProductToUserCollection = async (userId, productId, product) => {
  // // console.log(product);
  const userProductRef = doc(firestore, 'users', userId, 'products', productId);
  console.log("firestore", 'users', userId, 'products', productId);

  // Check if the product already exists in Firestore
  const productSnapshot = await getDoc(userProductRef);
  
  if (productSnapshot.exists()) {
      // Product exists, increment its quantity
      const currentQuantity = productSnapshot.data().quantity || 0;
      await updateDoc(userProductRef, { quantity: currentQuantity + 1 });
  } else {
      // Product doesn't exist, set it with the given quantity
      await setDoc(userProductRef, product, { merge: true });
  }
};
export const getUserProductRef = (userId, productId) => {
  return doc(firestore, 'users', userId, 'products', productId);
};
export const increaseProductQuantityInFirestore = async (userId, productId) => {
  const userProductRef = getUserProductRef(userId, productId);
  const productSnapshot = await getDoc(userProductRef);

  if (productSnapshot.exists()) {
    const currentQuantity = productSnapshot.data().quantity || 0;
    await updateDoc(userProductRef, { quantity: currentQuantity + 1 });
  }
};
export const decreaseProductQuantityInFirestore = async (userId, productId) => {
  const userProductRef = getUserProductRef(userId, productId);
  const productSnapshot = await getDoc(userProductRef);

  if (productSnapshot.exists()) {
    const currentQuantity = productSnapshot.data().quantity || 0;

    if (currentQuantity <= 1) {
      await deleteDoc(userProductRef);  // Remove product if quantity becomes 0
    } else {
      await updateDoc(userProductRef, { quantity: currentQuantity - 1 });
    }
  }
};
export const removeProductFromUserCollection = async (userId, productId) => {
  const userProductRef = doc(firestore, 'users', userId, 'products', productId);
  await deleteDoc(userProductRef);
};
export const fetchUserCart = async (userId) => {
  const productsRef = collection(doc(firestore, 'users', userId), 'products');
  const productSnapshot = await getDocs(productsRef);

  const cart = [];
  productSnapshot.forEach(doc => {
    cart.push({ ...doc.data(), id: doc.id });
  });

  return cart;
};
export const updateProductInFirestore = async (category, productId, updatedData) => {
  const productRef = doc(firestore, 'products', category, 'product', productId);
  if (!category || !productId) {
    console.error('Category or Product ID is missing!');
    return;
  }
  try {
    await updateDoc(productRef, updatedData);
    return { success: true, message: 'Product updated successfully!' };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, message: error.message };
  }
};
export const deleteProductFromFirestore = async (category, productId) => {
  const productRef = doc(firestore, 'products', category, 'product', productId);
  if (!category || !productId) {
    console.log('Category or Product ID is missing!');
    return;
  }
  try {
    await deleteDoc(productRef);
    return { success: true, message: 'Product deleted successfully!' };
  } catch (error) {
    console.log("Error deleting product:", error);
    return { success: false, message: error.message };
  }
};
export const deleteImageFromGSC = async (imageUrl) => {
  try {
    // assuming your imageUrl is something like "gs://bucket-name/file-path"
    // if not, you might need to adjust the path accordingly
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    return { success: true, message: 'Image deleted successfully!' };
  } catch (error) {
    console.error("Error deleting image:", error);
    return { success: false, message: error.message };
  }
};
