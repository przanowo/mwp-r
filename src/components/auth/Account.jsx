import React, { useState, useEffect, useContext } from 'react';
import { fetchUserDetails, updateUserDetails } from '../../firebase';
import AuthContext from '../../hooks/AuthContext';

const Account = () => {
  const { user } = useContext(AuthContext);

  const [details, setDetails] = useState({
    displayName: '',
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    city: '',
    postCode: '',
    country: '',
    email: '',  
  });
  const [message, setMessage] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (user) {
      (async () => {
        const response = await fetchUserDetails(user.uid);
        if (response.success) {
          // Merge the existing details with the fetched data
          setDetails(prevDetails => ({
            ...prevDetails,
            ...response.data
          }));
        } else {
          console.log('error', response);
        }
      })();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const response = await updateUserDetails(user.uid, details);
      alert(response.message);
      setEditing(false);
    } else {
      setMessage("User not authenticated!");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 shadow-md">
        <h2 className="text-2xl mb-4 font-semibold">Account Details</h2>
        {message && <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4">{message}</div>}
        
        {editing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
                {Object.keys(details).map(key => (
                    key !== 'createdAt' && (
                        <div key={key}>
                            <label className="block mb-2 font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                            <input
                                type="text"
                                name={key}
                                value={details[key]}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    )
                ))}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Save Details</button>
            </form>
        ) : (
            <>
                <div className="space-y-4">
                    {Object.entries(details).map(([key, value]) => {
                        if (key === 'createdAt') return null;

                        let displayValue = value;

                        // Check if the value is a Timestamp and convert it to a readable date format
                        if (value && value.seconds !== undefined && value.nanoseconds !== undefined) {
                            const date = new Date(value.seconds * 1000); // Convert seconds to milliseconds
                            displayValue = date.toLocaleDateString(); // Or use any other date format you prefer
                        }

                        return (
                            <div key={key}>
                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> <p>{displayValue}</p>
                            </div>
                        );
                    })}
                </div>
                <button onClick={() => setEditing(true)} className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Edit Details</button>
            </>
        )}
    </div>
    
  );
};

export default Account;
