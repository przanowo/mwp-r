import React, { useState } from 'react';
import { signUpWithEmailPassword } from '../../firebase';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate(); // Get the useNavigate function

  const handleSignUp = async () => { // Make this function async
    if (password !== passwordConfirmation) {
      alert('Passwords do not match.');
      return;
    }

    try {
      await signUpWithEmailPassword(email, password); // Use await here
      navigate('/')
      alert('Sign-up successful!');
      // Redirect or perform other actions here
    } catch (error) {
      alert(error.message); // Catch any errors
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <input
        className="p-2 border-2 border-gray-400 rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="p-2 mt-2 border-2 border-gray-400 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="p-2 mt-2 border-2 border-gray-400 rounded"
        type="password"
        placeholder="Confirm Password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <button className="p-2 mt-2 bg-green-500 text-white rounded" onClick={handleSignUp}>
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
