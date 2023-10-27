import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import data from '../routes/productData'; // Import data from productData.js
import { fetchProductFromFirestore } from '../../firebase';
import { useEffect, useState } from 'react';
import { CartContext } from '../../hooks/CartContext';
import { useContext } from 'react';
import EditProductModal from '../admin/EditProductModal'; // import the modal component
import AuthContext from '../../hooks/AuthContext';

const Product = () => {
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext); // Get the user from AuthContext
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = () => {
    addToCart(product); // assuming product object has an 'id' property which is equal to 'productId'
  };

  console.log('product', product);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditProduct = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveProduct = (editedProduct) => {
    // Save the edited product to the database or wherever necessary.
    setProduct(editedProduct); // update the displayed product
  };

  useEffect(() => {
    const loadProduct = async () => {
      const fetchedProduct = await fetchProductFromFirestore(productId);

      if (!fetchedProduct) {
        alert('Product not found');
        navigate(`/`);
        return; // Ensure we don't execute any code after navigation.
      }

      setProduct(fetchedProduct);
      setLoading(false);
    };

    loadProduct();
  }, [productId, navigate]);

  // useEffect(() => {
  //   const loadProduct = async () => {
  //     const fetchedProduct = await fetchProductFromFirestore(productId);
  //     setProduct(fetchedProduct);
  //     setLoading(false); // Set loading to false here
  //   };

  //   loadProduct();
  // }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mt-24 p-6 bg-white shadow-lg rounded-md'>
      <div className='flex'>
        <div className='w-1/2 pr-4'>
          <img
            src={product.mainImage}
            alt={product.title}
            className='w-full h-96 object-cover mb-4 rounded-md'
          />
          <div className='grid grid-cols-3 gap-2'>
            {product.images &&
              product.images.length > 0 &&
              product.images.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Product ${idx}`}
                  className='w-full h-24 object-cover rounded-md'
                />
              ))}
          </div>
        </div>
        <div className='w-1/2 pl-4'>
          <h2 className='text-2xl font-bold mb-2'>{product.title}</h2>
          <p className='mb-2'>
            {' '}
            {product.brand} {product.model}{' '}
            {product.mL ? product.mL + 'ml' : null}
          </p>
          <p className='text-gray-600 mb-4'>{product.description}</p>
          <p className='text-xl font-bold mb-2'>${product.price}</p>
          {/* <p className="mb-2"><span className="font-semibold">Brand:</span> {product.brand}</p> */}
          {/* <p className="mb-2">{product.ml} ml</p> */}
          <button
            className='bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200'
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          {user && user.uid === 'gwCvu8CwOCToe2owDmtKEHm7Cvj2' ? (
            <button
              className='bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200'
              onClick={handleEditProduct}
            >
              Edit
            </button>
          ) : null}
        </div>
      </div>
      {/* Conditionally render the EditProductModal */}
      {isEditModalOpen && (
        <EditProductModal
          product={product}
          onClose={handleCloseModal}
          onSave={handleSaveProduct}
          productId={productId}
        />
      )}
    </div>
  );
};

export default Product;
