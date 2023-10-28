import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
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
  where,
  getCountFromServer,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
// import { getFunctions, httpsCallable } from 'firebase/functions';

import algoliasearch from 'algoliasearch/lite';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // strorageBucketPublic: REACT_APP_STORAGE_BUCKET_PUBLIC,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

const algoliaClient = algoliasearch(
  process.env.REACT_APP_YOUR_ALGOLIA_APP_ID,
  process.env.REACT_APP_YOUR_ALGOLIA_KEY
);
const index = algoliaClient.initIndex('products');

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
      return {
        success: true,
        data: userSnapshot.data(),
        message: 'User details fetched successfully!',
      };
    } else {
      throw new Error('User not found in Firestore.');
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    return { success: false, message: error.message };
  }
};
export const updateUserDetails = async (userId, details) => {
  const userDocRef = doc(firestore, 'users', userId);

  try {
    await setDoc(userDocRef, details, { merge: true });
    return { success: true, message: 'User details updated successfully!' };
  } catch (error) {
    console.error('Error updating user details:', error);
    return { success: false, message: error.message };
  }
};
export const addProductToFirestore = async (product) => {
  try {
    // Add the titleLowCase field, set as the title but in lowercase
    const modifiedProduct = {
      ...product,
      titleLowCase: product.title.toLowerCase(),
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(firestore, 'products'), modifiedProduct);
    console.log('product', modifiedProduct);
    return { success: true, message: 'Product added successfully!' };
  } catch (error) {
    console.error('Error adding product:', error);
    return { success: false, message: error.message };
  }
};
export const uploadImage = async (file) => {
  // Create a unique filename: current timestamp + original file name
  const uniqueFilename = `${Date.now()}-${file.name}`;
  const folderName = 'productimages';
  // const bucketName = 'miniparfumqueenpublic';

  const storageRef = ref(storage, `${folderName}/${uniqueFilename}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
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
  const productCategories = [
    'miniature',
    'sample',
    'perfume',
    'gold',
    'gifts',
    'soapandpowder',
  ];
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
    querySnapshot.forEach((doc) => {
      allProducts[category][doc.id] = doc.data();
    });
    newLastVisibleProducts[category] =
      querySnapshot.docs[querySnapshot.docs.length - 1];
  }

  return {
    allProducts,
    lastVisible: newLastVisibleProducts,
  };
};
export const fetchProductFromFirestore = async (productId) => {
  try {
    console.log('Fetching product with ID:', productId);

    const productRef = doc(firestore, 'products', productId);
    const productDoc = await getDoc(productRef);

    if (!productDoc.data()) {
      return null;
    } else {
      return {
        id: productDoc.id,
        ...productDoc.data(),
      };
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    return null; // or you can handle the error in another way
  }
};

const fetchProducts = async (
  queryConditions,
  queryConditionOrder,
  limitNum
) => {
  const q = query(
    collection(firestore, 'products'),
    where('show', '==', 'yes'),
    ...queryConditions,
    ...queryConditionOrder,
    limit(limitNum || 6)
  );

  const querySnapshot = await getDocs(q);
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });

  return products;
};
export const fetchFeaturedProducts = async (limitNum) => {
  const queryConditions = [where('featured', '==', 'yes')];
  const queryConditionOrder = [orderBy('createdAt', 'desc')];
  return {
    productsFeatured: await fetchProducts(
      queryConditions,
      queryConditionOrder,
      limitNum
    ),
  };
};
export const fetchLikedProducts = async (limitNum) => {
  const queryConditions = [where('liked', '==', 'yes')];
  const queryConditionOrder = [orderBy('createdAt', 'desc')];
  return {
    productsLiked: await fetchProducts(
      queryConditions,
      queryConditionOrder,
      limitNum
    ),
  };
};
export const fetchSaleProducts = async (limitNum) => {
  const queryConditions = [where('discount', '>', 0)];
  const queryConditionOrder = [orderBy('discount', 'desc')];
  return {
    productsSale: await fetchProducts(
      queryConditions,
      queryConditionOrder,
      limitNum
    ),
  };
};
export const fetchManProducts = async (limitNum) => {
  const queryConditions = [where('sex', '==', 'men')];
  const queryConditionOrder = [orderBy('price', 'desc')];
  return {
    productsMan: await fetchProducts(
      queryConditions,
      queryConditionOrder,
      limitNum
    ),
  };
};
export const fetchWomanProducts = async (limitNum) => {
  const queryConditions = [where('sex', '==', 'women')];
  const queryConditionOrder = [orderBy('price', 'desc')];
  return {
    productsWomen: await fetchProducts(
      queryConditions,
      queryConditionOrder,
      limitNum
    ),
  };
};
export const firstBatchOfProducts = async (category, limitNum) => {
  const q = query(
    collection(firestore, 'products'),
    where('category', '==', category),
    where('show', '==', 'yes'),
    orderBy('title', 'desc'),
    limit(limitNum)
  );

  const querySnapshot = await getDocs(q);
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });

  const lastProduct = querySnapshot.docs[querySnapshot.docs.length - 1];
  // console.log('lastProduct', lastProduct);

  return {
    products,
    lastProduct,
  };
};
export const nextBatchOfProducts = async (
  category,
  limitNum,
  lastVisibleProduct
) => {
  const q = query(
    collection(firestore, 'products'),
    where('category', '==', category),
    where('show', '==', 'yes'),
    orderBy('title', 'desc'),
    startAfter(lastVisibleProduct),
    limit(limitNum)
  );

  const querySnapshot = await getDocs(q);
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });

  const lastProduct = querySnapshot.docs[querySnapshot.docs.length - 1];
  return {
    products,
    lastProduct,
  };
};
export const searchProductsByTitle = async (category, searchTerm) => {
  try {
    const { hits } = await index.search(searchTerm, {
      filters: `category:${category}`,
    });

    const products = hits.map((hit) => ({
      id: hit.objectID,
      ...hit,
    }));
    console.log(products);
    return products;
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};
export const addProductToUserCollection = async (
  userId,
  productId,
  product
) => {
  const userProductRef = doc(firestore, 'users', userId, 'products', productId);

  // Check if the product already exists in Firestore for this user
  const productSnapshot = await getDoc(userProductRef);

  if (productSnapshot.exists()) {
    // Product exists in the user's cart, increment its quantity
    const currentQuantity = productSnapshot.data().quantity || 0;
    await updateDoc(userProductRef, { quantity: currentQuantity + 1 });
  } else {
    // Product doesn't exist in the user's cart, store the product's ID and the given quantity
    await setDoc(
      userProductRef,
      { id: productId, quantity: product.quantity },
      { merge: true }
    );
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
      await deleteDoc(userProductRef); // Remove product if quantity becomes 0
    } else {
      await updateDoc(userProductRef, { quantity: currentQuantity - 1 });
    }
  }
};
export const removeProductFromUserCollection = async (userId, productId) => {
  const userProductRef = getUserProductRef(userId, productId);
  await deleteDoc(userProductRef);
};
export const fetchUserCart = async (userId) => {
  const productsRef = collection(doc(firestore, 'users', userId), 'products');
  const productSnapshot = await getDocs(productsRef);

  const cart = [];
  for (let docu of productSnapshot.docs) {
    let cartItem = docu.data();
    const productRef = doc(firestore, 'products', cartItem.id);
    const productData = await getDoc(productRef);

    if (productData.exists()) {
      // Add the product data and quantity to the cart
      cart.push({
        ...productData.data(),
        id: productData.id,
        quantity: cartItem.quantity,
      });
    }
  }

  return cart;
};
export const updateProductInFirestore = async (productId, updatedData) => {
  const productRef = doc(firestore, 'products', productId);
  if (!productId) {
    console.error('Product ID is missing!');
    return;
  }
  try {
    await updateDoc(productRef, updatedData);
    return { success: true, message: 'Product updated successfully!' };
  } catch (error) {
    console.error('Error updating product:', error);
    return { success: false, message: error.message };
  }
};
export const deleteProductFromFirestore = async (productId) => {
  const productRef = doc(firestore, 'products', productId);
  if (!productId) {
    console.log('Product ID is missing!');
    return;
  }
  try {
    await deleteDoc(productRef);
    return { success: true, message: 'Product deleted successfully!' };
  } catch (error) {
    console.log('Error deleting product:', error);
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
    console.error('Error deleting image:', error);
    return { success: false, message: error.message };
  }
};
export const createOrderFromCheckout = async (order) => {
  try {
    const modifiedOrder = {
      ...order,
      createdAt: serverTimestamp(),
    };
    await addDoc(collection(firestore, 'orders'), modifiedOrder);
    return { success: true, message: 'Order added successfully' };
  } catch (error) {
    console.error('error create order doc', error);
  }
};
export const addPaymentToOrderDoc = async (orderId, paymentConf) => {
  const orderRef = doc(firestore, 'orders', orderId);
  if (!orderId) {
    console.log('orderID is missing!');
    return;
  }
  try {
    await updateDoc(orderRef, paymentConf);
    return {
      success: true,
      message: 'Order updated with payment confirmation',
    };
  } catch (error) {
    return { success: false, message: 'error.message' };
  }
};
export const addNoteToFirestore = async (note) => {
  try {
    await addDoc(collection(firestore, 'notes'), note);
    return { success: true, message: 'Note added successfully!' };
  } catch (error) {
    console.error('Error adding note:', error);
    return { success: false, message: error.message };
  }
};
export const fetchNotesFromFirestore = async () => {
  const notesRef = collection(firestore, 'notes');
  const notesSnapshot = await getDocs(notesRef);

  const notes = [];
  notesSnapshot.forEach((doc) => {
    notes.push({ ...doc.data(), id: doc.id });
  });

  return notes;
};
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
    console.log('Error deleting note:', error);
    return { success: false, message: error.message };
  }
};
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
    console.error('Error updating note:', error);
    return { success: false, message: error.message };
  }
};

export const CountAllProducts = async () => {
  const coll = collection(firestore, 'products');
  const snapshot = await getCountFromServer(coll);
  console.log('count: ', snapshot.data().count);
  return snapshot.data().count;
};

export const CountProductsByCategory = async (category) => {
  const coll = collection(firestore, 'products');
  const queryFilter = query(coll, where('category', '==', category)); // Change the variable name to queryFilter
  const snapshot = await getDocs(queryFilter); // Use the queryFilter variable here
  console.log('count: ', snapshot.size);
  return snapshot.size;
};

// export const getCheckoutUrl = async (priceId) => {
//   const userId = auth.currentUser.uid;
//   if (!userId) throw new Error('User is not authenticated');

//   const checkoutSessionRef = collection(
//     firestore,
//     'users',
//     userId,
//     'checkout_sessions'
//   );

//   const docRef = await addDoc(checkoutSessionRef, {
//     price: priceId,
//     success_url: window.location.origin,
//     cancel_url: window.location.origin,
//     mode: 'payment', // to indicate this is a one-time payment instead of a subscription.
//   });

//   return new Promise((resolve, reject) => {
//     const unsubscribe = onSnapshot(docRef, (snap) => {
//       const { error, url } = snap.data();
//       if (error) {
//         unsubscribe();
//         reject(new Error(`An error occurred: ${error.message}`));
//       }
//       if (url) {
//         console.log('Stripe Checkout URL:', url);
//         unsubscribe();
//         resolve(url);
//       }
//     });
//   });
// };

// export const getPortalUrl = async () => {
//   const user = auth.currentUser;

//   let dataWithUrl;
//   try {
//     const functions = getFunctions(app, 'us-central1');
//     const functionRef = httpsCallable(
//       functions,
//       'ext-firestore-stripe-payments-createPortalLink'
//     );
//     const { data } = await functionRef({
//       customerId: user?.uid,
//       returnUrl: window.location.origin,
//     });

//     dataWithUrl = data;
//     console.log('Reroute to Stripe portal: ', dataWithUrl.url);
//   } catch (error) {
//     console.error(error);
//   }

//   return new Promise((resolve, reject) => {
//     if (dataWithUrl.url) {
//       resolve(dataWithUrl.url);
//     } else {
//       reject(new Error('No url returned'));
//     }
//   });
// };

export const createStripeCheckoutSession = async (totalPrice) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkoutSessionRef = await addDoc(
        collection(
          firestore,
          'users',
          auth.currentUser.uid,
          'checkout_sessions'
        ),
        {
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: 'Cart checkout',
                },
                unit_amount: totalPrice * 100, // Convert to cents
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: window.location.origin,
          cancel_url: window.location.origin,
        }
      );

      // Now attach the listener to the DocumentReference
      onSnapshot(checkoutSessionRef, (snap) => {
        const { sessionId } = snap.data();
        if (sessionId) {
          resolve(sessionId); // Return the session ID when it's available
        }
      });
    } catch (error) {
      console.error('Error creating Stripe checkout session:', error);
      reject(error);
    }
  });
};
