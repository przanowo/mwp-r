import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import data from '../routes/productData'; // Import data from productData.js
import { fetchProductFromFirestore } from '../../firebase';
import { useEffect, useState } from 'react';
import { CartContext } from '../../hooks/CartContext';
import { useContext } from 'react';
import EditProductModal from '../admin/EditProductModal'; // import the modal component
import AuthContext from '../../hooks/AuthContext';
import ImageGallery from './ImageGallery';

const Product = () => {
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext); // Get the user from AuthContext
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const galleryImages =
    product && product.images && product.images.length > 0
      ? product.images
      : [product?.mainImage];

  const handleImageClick = () => {
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
  };

  const handleAddToCart = () => {
    addToCart(product, productId); // assuming product object has an 'id' property which is equal to 'productId'
  };

  console.log('product', product, productId);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex mx-auto mt-24 p-6 bg-white shadow-lg rounded-md items-center justify-center w-4/5 h-3/4'>
      <div className='flex items-start'>
        <div className='p-4 w-2/5 h-3/4 relative'>
          <img
            src={product.mainImage}
            alt={product.title}
            className='w-full h-full object-cover mb-4 rounded-md cursor-pointer'
            onClick={handleImageClick}
          />
          <div className='grid grid-cols-3 gap-2 cursor-pointer w-2/3'>
            {product.images &&
              product.images.length > 0 &&
              product.images.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Product ${idx}`}
                  className='w-full h-24 object-cover rounded-md'
                  onClick={handleImageClick}
                />
              ))}
          </div>
        </div>
        <div className='w-1/2 pl-4 pt-12'>
          <h2 className='text-2xl font-bold mb-2'>{product.title}</h2>
          <p className='mb-2'>
            {' '}
            {product.brand} {product.model}{' '}
            {product.mL ? product.mL + 'ml' : null}
          </p>
          <p className='text-gray-600 my-6'>
            Description: {product.description}
          </p>
          <p className='text-gray-600'>Stock: {product.quantity}</p>
          <p className='text-gray-600'>Sex: {product.sex}</p>
          <p className='text-gray-600'>Category: {product.category}</p>
          <p className='text-gray-600'>Type: {product.typ}</p>
          <p className='text-gray-600'>Size: {product.size} ml</p>
          <p className='text-xl font-bold my-4'>${product.price}</p>
          {/* <p className="mb-2"><span className="font-semibold">Brand:</span> {product.brand}</p> */}
          {/* <p className="mb-2">{product.ml} ml</p> */}
          <button
            className='bg-orange-100 px-4 py-2 rounded-md hover:bg-orange-200  transition duration-200'
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          {user && user.uid === 'sGTDrSYDRBUcvzQVL5N2GiSNVE82' ? (
            <button
              className='bg-orange-100 mx-2 px-4 py-2 rounded-md hover:bg-orange-200 transition duration-200'
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
      {isGalleryOpen && product.images && (
        <ImageGallery images={galleryImages} onClose={handleCloseGallery} />
      )}
    </div>
  );
};

export default Product;
