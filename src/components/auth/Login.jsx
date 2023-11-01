import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  signInWithGoogle,
  signInWithEmailPassword,
  sendPassResetEmail,
} from '../../firebase';
import Footer from '../common/Footer';
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
    if (!email) {
      // Check if email is empty
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
    <div className='h-screen w-screen snap-y overflow-scroll justify-center items-center'>
      <div
        className='flex bg-cover bg-center items-center justify-center h-screen'
        style={{
          backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Floginbg.jpg?alt=media&token=97fc37ac-11a2-47fb-af77-462cc4a0d077")`,
        }}
      >
        <div className='flex flex-col bg-gray-300/50 rounded-lg p-6 w-full lg:p-16 lg:w-1/2'>
          <h1 className='text-3xl text-white font-bold p-4 text-center'>
            Login
          </h1>
          <input
            className='p-2 border-2 placeholder:text-white border-white/50 bg-white/25 rounded '
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='p-2 mt-2 border-2  rounded placeholder:text-white border-white/50 bg-white/25'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className='p-2 mt-2 bg-orange-400/50 hover:bg-orange-400 text-white rounded'
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className='p-2 mt-2 bg-red-500/75 hover:bg-red-500 text-white  rounded'
            onClick={handlesignInWithGoogle}
          >
            Login with Google
          </button>
          <button
            className='p-2 mt-2 bg-blue-500/75 hover:bg-blue-500 text-white rounded'
            onClick={handleLogin}
          >
            Login with Facebook
          </button>
          <button
            className='p-2 mt-2 text-white underline'
            onClick={handleForgotPassword}
          >
            Forgot password?
          </button>
        </div>
      </div>
      <div className=''>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
