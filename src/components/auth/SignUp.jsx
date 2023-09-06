import React, { useState } from 'react';
import { signUpWithEmailPassword } from '../../firebase';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Footer from '../common/Footer';

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

    <div className="h-screen w-screen snap-y overflow-scroll justify-center items-center">
      <div 
        className='snap-start flex bg-cover bg-center items-center justify-center h-screen '
        style={{ backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Floginbg.jpg?alt=media&token=97fc37ac-11a2-47fb-af77-462cc4a0d077")` }}
      >
        <div className="flex flex-col bg-gray-300/50 rounded-lg p-16 w-1/2">

          <h1 className="text-3xl text-white font-bold p-4 text-center">Register</h1>
          <input
          className="p-2 placeholder:text-white border-white/50 bg-white/25 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="p-2 mt-2 border-2 placeholder:text-white border-white/50 bg-white/25 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="p-2 mt-2 border-2 placeholder:text-white border-white/50 bg-white/25 rounded"
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <button className="p-2 mt-2 bg-orange-400/50 hover:bg-orange-400 text-white rounded" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>

      </div>
      <div className="">
        <Footer />
      </div>
    </div>





  );
};

export default Signup;
