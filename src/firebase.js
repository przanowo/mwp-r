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
  startAfter,
  getCountFromServer,
  where,


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
    // Add the titleLowCase field, set as the title but in lowercase
    const modifiedProduct = {
      ...product,
      titleLowCase: product.title.toLowerCase(),
    };

    await addDoc(collection(firestore, 'products', product.category, 'product'), modifiedProduct);
    console.log('product', modifiedProduct);
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
  const productCategories = ['vintage', 'miniature', 'sample', 'perfume', 'gold', 'gift', 'soapandpowder'];
  const allProducts = {};
  const newLastVisibleProducts = {};

  for (const category of productCategories) {
      let q = query(
          collection(firestore, 'products'),
          where('category', '==', category),
          orderBy('title', 'desc'),
          limit(6)
      );
      if (lastVisibleProducts[category]) {
          q = query(
              collection(firestore, 'products'),
              where('category', '==', category),
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

export const fetchProductFromFirestore = async (category, productId) => {
  const productRef = doc(firestore, 'products', productId);
  const productDoc = await getDoc(productRef);

  if (!productDoc.exists) {
      return null;
  }

  return {
      id: productDoc.id,
      ...productDoc.data(),
  };
};

export const fetchProductsByCategoryFromFirestore = async (category, lastVisibleProduct = null, limitNum) => {
  let q = query(
      collection(firestore, 'products'),
      where('category', '==', category),
      orderBy('title', 'desc'),
      limit(limitNum)
  );

  if (lastVisibleProduct) {
      q = query(
          collection(firestore, 'products'),
          where('category', '==', category),
          orderBy('title', 'desc'),
          startAfter(lastVisibleProduct),
          limit(limitNum)
      );
  }

  const querySnapshot = await getDocs(q);
  const products = [];
  querySnapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() });
  });

  const lastProduct = querySnapshot.docs[querySnapshot.docs.length - 1];
  return {
      products,
      lastProduct,
  };
};

export const getTotalNumberOfProducts = async (category) => {
  // Note: Firebase doesn't provide a direct way to count the number of documents in a collection. 
  // You might need to have a separate cloud function to maintain a count or use a different strategy.
};

export const searchProductsByTitle = async (category, searchTerm) => {
  try {
      const q = query(
          collection(firestore, 'products'),
          where('category', '==', category),
          where('titleLowCase', '>=', searchTerm),
          where('titleLowCase', '<=', searchTerm + '\uf8ff')
      );
      const querySnapshot = await getDocs(q);
      const products = [];
      querySnapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: products };
  } catch (error) {
      return { success: false, message: error.message };
  }
};

// export const updateProductTitles = async () => {
//   const firestore = getFirestore();
//   const productCategories = ['vintage', 'miniature', 'sample', 'parfum', 'gold', 'gift', 'soapandpowder'];

//   for (const category of productCategories) {
//     const productsRef = collection(firestore, 'products', category, 'product');
//     const snapshot = await getDocs(productsRef);

//     const batch = writeBatch(firestore);

//     snapshot.docs.forEach(docSnap => {
//       const data = docSnap.data();
//       if (data.title) {
//         const newField = { titleLowCase: data.title.toLowerCase() };
//         const docRef = doc(firestore, 'products', category, 'product', docSnap.id);
//         batch.update(docRef, newField);
//       }
//     });
    
//     await batch.commit();
//   }

//   console.log('Titles updated successfully');
// };
// export const fetchProductsFromFirestore = async (lastVisibleProducts = {}) => {
//   const productCategories = ['vintage', 'miniature', 'sample', 'parfum', 'gold',  'gift', 'soapandpowder'];
//   const allProducts = {};
//   const newLastVisibleProducts = {};

//   for (const category of productCategories) {
//     let q = query(
//       collection(firestore, 'products', category, 'product'),
//       orderBy('title', 'desc'),
//       limit(6)
//     );
//     if (lastVisibleProducts[category]) {
//       q = query(
//         collection(firestore, 'products', category, 'product'),
//         orderBy('title', 'desc'),
//         startAfter(lastVisibleProducts[category]),
//         limit(4)
//       );
//     }

//     const querySnapshot = await getDocs(q);
//     allProducts[category] = {};
//     querySnapshot.forEach(doc => {
//       allProducts[category][doc.id] = doc.data();
//     });
//     newLastVisibleProducts[category] = querySnapshot.docs[querySnapshot.docs.length - 1];
//   }

//   return {
//     allProducts,
//     lastVisible: newLastVisibleProducts
//   };
// };
// export const fetchProductFromFirestore = async (category, productId)  => {
//   const productRef = doc(firestore, 'products', category, 'product', productId);
//   const productDoc = await getDoc(productRef);

//   if (!productDoc.exists) {
//       return null;
//   }

//   return {
//       id: productDoc.id,
//       ...productDoc.data(),
//   };
// };
// export const fetchProductsByCategoryFromFirestore = async (category, lastVisibleProduct = null, limitNum ) => {
//   let q = query(
//     collection(firestore, 'products', category, 'product'),
//     orderBy('title', 'desc'),
//     limit(limitNum)
//   );

//   if (lastVisibleProduct) {
//     q = query(
//       collection(firestore, 'products', category, 'product'),
//       orderBy('title', 'desc'),
//       startAfter(lastVisibleProduct),
//       limit(limitNum)
//     );
//   }

//   const querySnapshot = await getDocs(q);
//   const products = [];
//   querySnapshot.forEach(doc => {
//     products.push({ id: doc.id, ...doc.data() });
//   });

//   const lastProduct = querySnapshot.docs[querySnapshot.docs.length - 1];
//   return {
//     products,
//     lastProduct,
//   };
// };
// export const getTotalNumberOfProducts = async (category) => {
//   const coll = collection(firestore, "products", category, "product");
//   const snapshot = await getCountFromServer(coll);
//   console.log('count: ', snapshot.data().count);

//   return snapshot.data().count;
// };
// export const searchProductsByTitle = async (category, searchTerm) => {
//   try {

//     console.log(searchTerm);
//     const productRef = collection(firestore, 'products', category, 'product');
//     const q = query(
//       productRef,
//       where('titleLowCase', '>=', searchTerm),
//       where('titleLowCase', '<=', searchTerm + '\uf8ff') // to search startWith title
//     );
//     const querySnapshot = await getDocs(q);
//     const products = [];
//     console.log(products);
//     querySnapshot.forEach((doc) => {
//       products.push({ id: doc.id, ...doc.data() });
//     });
//     return { success: true, data: products };
//   } catch (error) {
//     return { success: false, message: error.message };
//   }
// };
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
export const addNoteToFirestore = async (note) => {
  try {
    await addDoc(collection(firestore, 'notes'), note);
    return { success: true, message: 'Note added successfully!' };
  } catch (error) {
    console.error("Error adding note:", error);
    return { success: false, message: error.message };
  }
}
export const fetchNotesFromFirestore = async () => {
  const notesRef = collection(firestore, 'notes');
  const notesSnapshot = await getDocs(notesRef);

  const notes = [];
  notesSnapshot.forEach(doc => {
    notes.push({ ...doc.data(), id: doc.id });
  });

  return notes;
}
export const deleteNoteFromFirestore = async (noteId) => {
  const noteRef = doc(firestore, 'notes', noteId);
  if (!noteId) {
    console.log('Note ID is missing!');
    return;
  }
  try {
    await deleteDoc(noteRef);
    return { success: true, message: 'Note deleted successfully!' };
  } catch (error) {
    console.log("Error deleting note:", error);
    return { success: false, message: error.message };
  }
}
export const updateNoteInFirestore = async (noteId, updatedData) => {
  const noteRef = doc(firestore, 'notes', noteId);
  if (!noteId) {
    console.log('Note ID is missing!');
    return;
  }
  try {
    await updateDoc(noteRef, updatedData);
    return { success: true, message: 'Note updated successfully!' };
  } catch (error) {
    console.error("Error updating note:", error);
    return { success: false, message: error.message };
  }
}


// export const  updateProducts = async () =>  {
//   try {
//     // Reference to the products collection
//     const productsCollection = collection(firestore, "products");

//     // Fetch all products
//     const productsSnapshot = await getDocs(productsCollection);
//     console.log(productsSnapshot.docs);
    
//     for (const productDoc of productsSnapshot.docs) {
//       const productData = productDoc.data();
      
//       let changes = {
//         magazine: 'NL'  // Add the new key-value pair
//       };

//       // If the "sex" key is not set or is null, assign it the value "women"
//       if (!productData.sex) {
//         console.log(productData)
//         changes.sex = 'women';
//       }
      
//       // Update the document in Firestore
//       await updateDoc(doc(firestore, "products", productDoc.id), changes);
//     }
//   } catch (error) {
//     console.error("An error occurred while updating products:", error);
//     // You might also want to display a notification to the user or log the error to an error reporting service.
//   }
// }
