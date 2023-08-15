// EditProductModal.jsx

import React, { useState, useRef } from 'react';
import {updateProductInFirestore, uploadImage, deleteProductFromFirestore} from '../../firebase';
import { useNavigate, useLocation } from 'react-router-dom';



const EditProductModal = ({ product, onClose, onSave, productId, category }) => {
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
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };

  // const handleImgUpl = async () => {
  //   let imageUrls = [];
  //   for (let image of images) {
  //     const imageUrl = await uploadImage(image, category);
  //     imageUrls.push(imageUrl);
  //   }

  //   editedProduct.imageUrls = imageUrls;
  //   editedProduct.mainImageUrl = imageUrls[mainImageIndex];

  //   const response = await updateProductInFirestore(category, productId, editedProduct);
  //   if (response.success) {
  //     alert(response.message);
  //     onSave(editedProduct);
  //     onClose();
  //   } else {
  //     alert(`Error: ${response.message}`);
  //   }
  // };

  const handleSave = async () => {
    
    // Check if images are provided
    if (images && images.length > 0) {
        let imageUrls = [];
        
        for (let image of images) {
            const imageUrl = await uploadImage(image, category);
            imageUrls.push(imageUrl);
        }
        
        editedProduct.imageUrls = imageUrls;
        
        // Set mainImageUrl only if mainImageIndex is valid
        if (typeof mainImageIndex !== 'undefined' && mainImageIndex < imageUrls.length) {
            editedProduct.mainImageUrl = imageUrls[mainImageIndex];
        } else {
            // Handle case where mainImageIndex might be out of bounds or undefined
            console.error("Main image index is not valid!");
        }
    }

    const response = await updateProductInFirestore(category, productId, editedProduct);
    
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
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = async () => {
    const confirmation = window.confirm("Are you sure you want to delete this product?");
    if (confirmation) {
        console.log(category, productId)
      const response = await deleteProductFromFirestore(category, productId);

      if (response.success) {
        alert(response.message);
        onDelete( );
        console.log(location.state);  // You can create an onDelete prop to handle what to do after deletion
      } else {
        alert(`Error: ${response.message}`);
      }
    }
  };
  const onDelete = () => {
    try {
        navigate(-1);
    } catch {
        navigate(`/shop/${category}`);
    }
};

  return (
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 m-4 rounded-lg w-3/4 h-2/3 overflow-y-auto">
        <h2 className="text-2xl mb-4 font-semibold border-b pb-2">Edit Product</h2>
        
        <div className="space-y-4">
            { /* This structure can be repeated for each input group */ }
            <div className="flex items-center space-x-2">
                <label className="w-1/4 text-right font-medium">Condition:</label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="cond"
                    value={editedProduct.cond}
                    onChange={handleChange}
                    required>
                    <option value="" disabled >Select an option</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                </select>
            </div>
            <div className="flex items-center space-x-2">
                <label className="w-1/4 text-right font-medium">Sex:</label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="sex"
                    value={editedProduct.sex}
                    onChange={handleChange}
                    required>
                    <option value="" disabled >Select an option</option>
                    <option value="man">Man</option>
                    <option value="woman">Woman</option>
                    <option value="unisex">Unisex</option>
                </select>
            </div>
            <div className="flex items-center space-x-2">
                <label className="w-1/4 text-right font-medium">Category:</label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="category"
                    value={editedProduct.category}
                    onChange={handleChange}
                    required>
                    <option value="" disabled >Select an option</option>
                    <option value="sample">Sample</option>
                    <option value="sampleR">Sample refilled</option>
                    <option value="miniatureB">Miniature with box</option>
                    <option value="miniature">Miniature without box</option>
                    <option value="vintage">Vintage</option>
                </select>
            </div>
            <div className="flex items-center space-x-2">
                <label className="w-1/4 text-right font-medium">Type:</label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="Type"
                    value={editedProduct.Type}
                    onChange={handleChange}
                    required>
                    <option value="" disabled >Select an option</option>
                    <option value="edt">Eau de Toilette</option>
                    <option value="edp">Eau de Parfum</option>
                    <option value="parfum">Parfum</option>
                </select>
            </div>
            <div className="flex items-center space-x-2">
                <label className="w-1/4 text-right font-medium">Brand:</label>
                <input className="border p-2 flex-grow rounded w-full" type="text" name="brand" value={editedProduct.brand} onChange={handleInputChange} placeholder="Brand" />
            </div>
            <div className="flex items-center space-x-2">
                <label className="w-1/4 text-right font-medium">Model:</label>
                <input className="border p-2 flex-grow rounded w-full" type="text" name="model" value={editedProduct.model} onChange={handleInputChange} placeholder="Model" />
            </div>
            <div className="flex items-center space-x-2">
                <label className="w-1/4 text-right font-medium">Price:</label>
                <input className="border p-2 flex-grow rounded w-full" type="number" name="price" value={editedProduct.price} onChange={handleInputChange} placeholder="Price" />
            </div>
            <div className="flex items-center space-x-2">
              <label className="w-1/4 text-right font-medium">Stock:</label>
              <input className="border p-2 flex-grow rounded w-full" type="number" name="stock" value={editedProduct.stock} onChange={handleInputChange} placeholder="Stock" />
            </div>
            <div className="flex items-center space-x-2">
                <label className="w-1/4 text-right font-medium">Size:</label>
                <input className="border p-2 flex-grow rounded w-full" type="text" name="mL" value={editedProduct.mL} onChange={handleInputChange} placeholder="Size" />
            </div>
            <div className="flex items-center space-x-2">
                <label className="w-1/4 text-right font-medium">Title:</label>
                <input className="border p-2 flex-grow rounded w-full" type="text" name="title" value={editedProduct.title} onChange={handleInputChange} placeholder="Title" />
            </div>
            <div className="flex items-center space-x-2">
                <label className="w-1/4 text-right font-medium">Year:</label>
                <input className="border p-2 flex-grow rounded w-full" type="text" name="year" value={editedProduct.year} onChange={handleInputChange} placeholder="Year" />
            </div>
            {/* ... other input fields with similar structure ... */}

            <div className="flex items-start space-x-2 mt-4">
                <label className="w-1/4 text-right align-top font-medium">Description:</label>
                <textarea className="border p-2 flex-grow rounded h-32  w-full" name="description" value={editedProduct.description} onChange={handleInputChange} placeholder="Description"></textarea>
            </div>
            <div className="flex items-center space-x-2">
                <label className="w-1/4 text-right font-medium">Images:</label>
                <div className="w-3/4 grid grid-cols-2 gap-4">
                    {editedProduct.imageUrls.map((imgUrl, index) => (
                        <div key={index}>
                            <img 
                              src={imgUrl} 
                              alt="Product Image" 
                              className="w-full h-32 object-cover rounded-md"
                              width={50}
                              // style={{border: index === mainImageIndex ? '2px solid blue' : ''}} 
                              // onClick={() => setMainImageIndex(index)}
                               />
                        </div>
                    ))}
                </div>

                <div>
                  <input type="file" ref={fileInputRef} multiple onChange={handleImagesChange} />
                  <div className="flex mt-4">
                      {images.map((image, index) => (
                          <div key={index} className="mr-2">
                              <img 
                                  src={URL.createObjectURL(image)} 
                                  alt="Selected" 
                                  width={50}
                                  style={{border: index === mainImageIndex ? '2px solid blue' : ''}} 
                                  onClick={() => setMainImageIndex(index)}
                              />
                          </div>
                      ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                    {/* <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleImgUpl}
                        >
                        Upload
                    </button> */}
                </div>

            </div>
          </div>




        <div className="mt-6 flex justify-end space-x-2">
            <button className="bg-red-600 text-white px-4 py-2 rounded-md transition duration-150 hover:bg-red-700" onClick={onClose}>Cancel</button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md transition duration-150 hover:bg-green-700" onClick={handleSave}>Save</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md transition duration-150 hover:bg-red-600" onClick={handleDelete}>Delete Product</button>
        </div>
    </div>
</div>

  );
};

export default EditProductModal;
