import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { signInWithGoogle, signInWithEmailPassword, sendPassResetEmail } from '../../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Get the useNavigate function

  const handleLogin = async () => {
    try {
      await signInWithEmailPassword(email, password);
      navigate('/'); // Redirect to home page
      alert('Login successful!');
    } catch (error) {
      alert(error.message);
    }
  };

  const handlesignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate('/'); // Redirect to home page
      alert('Login successful!');
    } catch (error) {
      alert(error.message);
    }
  };
  const handleForgotPassword = async () => {
    if (!email) { // Check if email is empty
      alert('Please enter your email address.');
      return;
    }

    try {
      await sendPassResetEmail(email);
      alert('Password reset link sent to your email.');
    } catch (error) {
      alert(error.message);
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
      <button className="p-2 mt-2 bg-blue-500 text-white rounded" onClick={handleLogin}>
        Login
      </button>
      <button className="p-2 mt-2 bg-red-500 text-white rounded" onClick={handlesignInWithGoogle}>
        Login with Google
      </button>
      <button className="p-2 mt-2 text-blue-500 underline" onClick={handleForgotPassword}>
        Forgot password?
      </button>
    </div>
  );
};

export default Login;
