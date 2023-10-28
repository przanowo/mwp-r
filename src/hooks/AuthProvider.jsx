import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import AuthContext from './AuthContext';
import { createUserDocumentFromAuth } from '../firebase'; // Assuming this is the location

const AuthProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      console.log(user);

      // The user is authenticated, attempt to create/update their document.
      createUserDocumentFromAuth(user).catch((error) => {
        console.error('Failed to create/update user document:', error);
      });
    }
  }, [user]); // This effect runs whenever the `user` state changes.

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
