// EditProductModal.jsx

import React, { useState, useRef } from 'react';
import {
  updateProductInFirestore,
  uploadImage,
  deleteProductFromFirestore,
  deleteImageFromGSC,
} from '../../firebase';
import { useNavigate, useLocation } from 'react-router-dom';

const EditProductModal = ({ product, onClose, onSave, productId }) => {
  const [editedProduct, setEditedProduct] = useState(product);
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handleImagesChange = (e) => {
    const selectedImages = [...e.target.files];
    setImages(selectedImages);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // Check if images are provided
    if (images && images.length > 0) {
      let imageUrls = [];
      for (let image of images) {
        const imageUrl = await uploadImage(image);
        imageUrls.push(imageUrl);
      }
      editedProduct.imageUrls = imageUrls;
      // Set mainImageUrl only if mainImageIndex is valid
      if (
        typeof mainImageIndex !== 'undefined' &&
        mainImageIndex < imageUrls.length
      ) {
        editedProduct.mainImageUrl = imageUrls[mainImageIndex];
      } else {
        // Handle case where mainImageIndex might be out of bounds or undefined
        console.error('Main image index is not valid!');
      }
    }

    const response = await updateProductInFirestore(productId, editedProduct);
    // await updateProductCount(category, 'increment');

    if (response.success) {
      alert(response.message);
      onSave(editedProduct);
      onClose();
    } else {
      alert(`Error: ${response.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async () => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (confirmation) {
      for (const imageUrl of product.images) {
        await deleteImageFromGSC(imageUrl);
      }

      // console.log(category, productId)
      const response = await deleteProductFromFirestore(productId);
      //   await updateProductCount(category, 'decrement');

      if (response.success) {
        alert(response.message);
        onDelete();
        console.log(location.state); // You can create an onDelete prop to handle what to do after deletion
      } else {
        alert(`Error: ${response.message}`);
      }
    }
  };
  const onDelete = () => {
    try {
      navigate(`/`);
    } catch {
      navigate(-1);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 m-4 rounded-lg w-3/4 h-2/3 overflow-y-auto'>
        <h2 className='text-2xl mb-4 font-semibold border-b pb-2'>
          Edit Product
        </h2>

        <div className='space-y-4'>
          {/* This structure can be repeated for each input group */}
          <div className='flex items-center space-x-2'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='sex'
            >
              Sex:
            </label>
            <select
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              name='sex'
              value={editedProduct.sex}
              onChange={handleChange}
              required
            >
              <option value='' disabled>
                Select an option
              </option>
              <option value='men'>Man</option>
              <option value='women'>Woman</option>
              <option value='unisex'>Unisex</option>
            </select>
          </div>
          <div className='flex items-center space-x-2'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2 py-2'
              htmlFor='category'
            >
              Category:
            </label>
            <select
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              name='category'
              value={editedProduct.category}
              onChange={handleChange}
              required
            >
              <option value='' disabled>
                Select an option
              </option>
              <option value='sample'>Sample</option>
              <option value='miniature'>Miniature</option>
              <option value='perfume'>Parfum</option>
              <option value='soap'>Soap & Powder</option>
              <option value='gifts'>Gifts</option>
            </select>
          </div>
          <div className='flex items-center space-x-2'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2 py-2'
              htmlFor='nowe'
            >
              Condition:
            </label>
            <select
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              name='nowe'
              value={editedProduct.nowe}
              onChange={handleChange}
              required
            >
              <option value='' disabled>
                Select an option
              </option>
              <option value='yes'>New</option>
              <option value='no'>Used</option>
            </select>
          </div>
          <div className='flex items-center space-x-2'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2 py-2'
              htmlFor='typ'
            >
              Type:
            </label>
            <select
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              name='typ'
              value={editedProduct.typ}
              onChange={handleChange}
              required
            >
              <option value='' disabled>
                Select an option
              </option>
              <option value='edt'>Eau de Toilette</option>
              <option value='edp'>Eau de Parfum</option>
              <option value='edc'>Eau de Cologne</option>
              <option value='parfum'>Parfum</option>
            </select>
          </div>
          <div className='flex items-center space-x-2'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2 py-2'
              htmlFor='show'
            >
              Show:
            </label>
            <select
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              name='show'
              value={editedProduct.show}
              onChange={handleChange}
              required
            >
              <option value='' disabled>
                Select an option
              </option>
              <option value='yes'>Yes</option>
              <option value='no'>No</option>
            </select>
          </div>
          {/* <div className="flex items-center space-x-2">
                <label className="block text-gray-700 text-sm font-bold mb-2 py-2" htmlFor="magazine">
                    Magazine:
                </label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="magazine"
                    value={editedProduct.magazine}
                    onChange={handleChange}
                    required>
                    <option value="" disabled >Select an option</option>
                    <option value="NL">NL</option>
                    <option value="HU">HU</option>
                </select>
            </div> */}
          <div className='flex items-center space-x-2'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2 py-2'
              htmlFor='liked'
            >
              Liked:
            </label>
            <select
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              name='liked'
              value={editedProduct.liked}
              onChange={handleChange}
              required
            >
              <option value='' disabled>
                Select an option
              </option>
              <option value='yes'>Yes</option>
              <option value='no'>No</option>
            </select>
          </div>
          <div className='flex items-center space-x-2'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2 py-2'
              htmlFor='featured'
            >
              Featured:
            </label>
            <select
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              name='featured'
              value={editedProduct.featured}
              onChange={handleChange}
              required
            >
              <option value='' disabled>
                Select an option
              </option>
              <option value='yes'>Yes</option>
              <option value='no'>No</option>
            </select>
          </div>
          {/* { product.category === 'miniature' && (
                        <div className="flex items-center space-x-2">
                        <label className="w-1/4 text-right font-medium" htmlFor="box">
                            Miniature box:
                        </label> 
                        <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required>
                            <option value="" disabled >Select an option</option>
                            <option value={false}>Miniature without box</option>
                            <option value={true}>Miniature with box</option>
                        </select>
                        </div>
                    ) } */}

          <div className='flex items-center space-x-2'>
            <label className='w-1/4 text-right font-medium'>Title:</label>
            <input
              className='border p-2 flex-grow rounded w-full'
              type='text'
              name='title'
              value={editedProduct.title}
              onChange={handleInputChange}
              placeholder='Title'
            />
          </div>
          <div className='flex items-center space-x-2'>
            <label className='w-1/4 text-right font-medium'>Description:</label>
            <input
              className='border p-2 flex-grow rounded w-full'
              type='text'
              name='description'
              value={editedProduct.description}
              onChange={handleInputChange}
              placeholder='Description'
            />
          </div>
          <div className='flex items-center space-x-2'>
            <label className='w-1/4 text-right font-medium'>Price:</label>
            <input
              className='border p-2 flex-grow rounded w-full'
              type='number'
              name='price'
              value={editedProduct.price}
              onChange={handleInputChange}
              placeholder='Price'
            />
          </div>
          <div className='flex items-center space-x-2'>
            <label className='w-1/4 text-right font-medium'>Size:</label>
            <input
              className='border p-2 flex-grow rounded w-full'
              type='number'
              name='size'
              value={editedProduct.size}
              onChange={handleInputChange}
              placeholder='Size'
            />
          </div>
          <div className='flex items-center space-x-2'>
            <label className='w-1/4 text-right font-medium'>Ratings:</label>
            <input
              className='border p-2 flex-grow rounded w-full'
              type='number'
              name='ratings'
              value={editedProduct.ratings}
              onChange={handleInputChange}
              placeholder='Ratings'
            />
          </div>
          <div className='flex items-center space-x-2'>
            <label className='w-1/4 text-right font-medium'>Quantity:</label>
            <input
              className='border p-2 flex-grow rounded w-full'
              type='number'
              name='quantity'
              value={editedProduct.quantity}
              onChange={handleInputChange}
              placeholder='Quantity'
            />
          </div>
          <div className='flex items-center space-x-2'>
            <label className='w-1/4 text-right font-medium'>Discount:</label>
            <input
              className='border p-2 flex-grow rounded w-full'
              type='number'
              name='discount'
              value={editedProduct.discount}
              onChange={handleInputChange}
              placeholder='Discount'
            />
          </div>
          {/* ... other input fields with similar structure ... */}

          <div className='flex items-center space-x-2'>
            <label className='w-1/4 text-right font-medium'>Images:</label>
            <div className='w-3/4 grid grid-cols-2 gap-4'>
              {editedProduct.images &&
                editedProduct.images.length > 0 &&
                editedProduct.images.map((imgUrl, index) => (
                  <div key={index}>
                    <img
                      src={imgUrl}
                      alt='Product'
                      className='w-full h-32 object-cover rounded-md'
                      width={50}
                      // style={{border: index === mainImageIndex ? '2px solid blue' : ''}}
                      // onClick={() => setMainImageIndex(index)}
                    />
                  </div>
                ))}
            </div>

            <div>
              <input
                type='file'
                ref={fileInputRef}
                multiple
                onChange={handleImagesChange}
              />
              <div className='flex mt-4'>
                {images.map((image, index) => (
                  <div key={index} className='mr-2'>
                    <img
                      src={URL.createObjectURL(image)}
                      alt='Selected'
                      width={50}
                      style={{
                        border:
                          index === mainImageIndex ? '2px solid blue' : '',
                      }}
                      onClick={() => setMainImageIndex(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className='flex items-center justify-between'>
              {/* <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleImgUpl}
                        >
                        Upload
                    </button> */}
            </div>
          </div>
        </div>

        <div className='mt-6 flex justify-end space-x-2'>
          <button
            className='bg-red-600 text-white px-4 py-2 rounded-md transition duration-150 hover:bg-red-700'
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className='bg-green-600 text-white px-4 py-2 rounded-md transition duration-150 hover:bg-green-700'
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded-md transition duration-150 hover:bg-red-600'
            onClick={handleDelete}
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
