import React, { useContext, useState } from 'react';
import AuthContext from '../../hooks/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../hooks/CartContext';
import EditProductModal from '../admin/EditProductModal'; // import the modal component

const ProductCard = ({ product, productId }) => {
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext); // Get the user from AuthContext
  const { addToCart } = useContext(CartContext);
  const [currentProduct, setCurrentProduct] = useState(product);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAddToCart = () => {
    if (user) {
      console.log('Adding to cart, ProductId:', productId);
      addToCart(product, productId); // assuming product object has an 'id' property which is equal to 'productId'
      // Perform the "Add to cart" action
    } else {
      // Redirect to the login page
      navigate('/login');
    }
  };

  const handleEditProduct = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveProduct = (editedProduct) => {
    // Save the edited product to the database or wherever necessary.
    setCurrentProduct(editedProduct); // update the displayed product
  };

  return (
    <div
      key={productId}
      className='border p-4 rounded-md hover:shadow-lg transition-shadow duration-300'
    >
      <Link to={`/shop/${productId}`} key={productId}>
        <div className=' bg-gray-200 overflow-hidden rounded-md'>
          <img
            src={currentProduct.mainImage}
            alt={currentProduct.title}
            className='object-cover h-full w-full'
          />
        </div>

        <div className='mt-4'>
          <h3 className='text-sm font-semibold overflow-hidden h-[60px]'>
            {currentProduct.title}
          </h3>
          <p className='text-lg font-bold mt-2'>${currentProduct.price}</p>
        </div>
      </Link>
      <div className='mt-2'>
        <button
          className='bg-gray-300 text-black text-center px-2 py-1 rounded-md hover:bg-gray-400 transition duration-200'
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
        {user && user.uid === 'gwCvu8CwOCToe2owDmtKEHm7Cvj2' ? (
          <button
            className='bg-gray-300 text-black text-center text-sm px-2 py-1 rounded-md hover:bg-gray-400 transition duration-200'
            onClick={handleEditProduct}
          >
            Edit
          </button>
        ) : null}
      </div>
      {/* Conditionally render the EditProductModal */}
      {isEditModalOpen &&
        (console.log(currentProduct),
        (
          <EditProductModal
            product={currentProduct}
            onClose={handleCloseModal}
            onSave={handleSaveProduct}
            productId={productId}
          />
        ))}
    </div>
  );
};

export default ProductCard;
