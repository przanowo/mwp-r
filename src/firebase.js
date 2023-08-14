import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytesResumable, 
  getDownloadURL 
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

export const addProductToFirestore = async (product) => {
  try {
    await addDoc(collection(firestore, 'products', product.category, 'products'), product);
    return { success: true, message: 'Product added successfully!' };
  } catch (error) {
    console.error("Error adding product:", error);
    return { success: false, message: error.message };
  }
};

export const uploadImage = async (file, folderName) => {
  const storageRef = ref(storage, `${folderName}/${file.name}`);
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