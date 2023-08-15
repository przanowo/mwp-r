// import React, { useState, useEffect } from 'react';
// import {
//   handleProductDataChange,
//   updateProductInFirestore,
//   deleteProductFromFirestore,
// } from '../../firebase'; 
// import { fetchProductsFromFirestore } from '../../firebase';

// const EditProductModal = ({ product, onClose, onSave }) => {
//   const [editedProduct, setEditedProduct] = useState(product);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedProduct(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = () => {
//     onSave(editedProduct);
//     onClose();
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 mt-30">
//       <div className="bg-white p-6 rounded w-2/3 overflow-y-auto max-h-screen">
//         <h2 className="mb-4">Edit Product</h2>
//         <input name="title" value={editedProduct.title} onChange={handleInputChange} className="border mb-2 p-2 w-full" placeholder="Title" />
//         <input name="brand" value={editedProduct.brand} onChange={handleInputChange} className="border mb-2 p-2 w-full" placeholder="Brand" />
//         <input name="Year" value={editedProduct.Year} onChange={handleInputChange} className="border mb-2 p-2 w-full" placeholder="Year" />
//         <input name="Type" value={editedProduct.Type} onChange={handleInputChange} className="border mb-2 p-2 w-full" placeholder="Type" />
//         <input name="model" value={editedProduct.model} onChange={handleInputChange} className="border mb-2 p-2 w-full" placeholder="Model" />
//         <input name="cond" value={editedProduct.cond} onChange={handleInputChange} className="border mb-2 p-2 w-full" placeholder="Condition" />
//         <textarea name="description" value={editedProduct.description} onChange={handleInputChange} className="border mb-2 p-2 w-full" placeholder="Description" />
//         <input name="price" type="number" value={editedProduct.price} onChange={handleInputChange} className="border mb-2 p-2 w-full" placeholder="Price" />
//         <input name="stock" type="number" value={editedProduct.stock} onChange={handleInputChange} className="border mb-2 p-2 w-full" placeholder="Stock" />
//         <input name="sex" value={editedProduct.sex} onChange={handleInputChange} className="border mb-2 p-2 w-full" placeholder="Sex" />
//         <input name="mainImageUrl" value={editedProduct.mainImageUrl} onChange={handleInputChange} className="border mb-2 p-2 w-full" placeholder="Main Image URL" />
//         <div className="flex flex-wrap justify-between">
//           {editedProduct.imageUrls && editedProduct.imageUrls.map((url, index) => (
//             <div key={index} className="mb-2 w-1/4">
//               <img src={url} alt={`Image ${index}`} className="mb-2 w-full h-32 object-cover"/>
//               <input name={`imageUrls[${index}]`} value={url} onChange={handleInputChange} className="border mb-2 p-2 w-full" placeholder={`Image URL ${index}`} />
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-end space-x-4">
//           <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
//           <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProductsAdm = () => {
//   const [products, setProducts] = useState({});
//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const [selectedProductData, setSelectedProductData] = useState({});
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const allProducts = await fetchProductsFromFirestore();
//       setProducts(allProducts);
//     };
//     fetchProducts();
//   }, []);

//   const handleEditClick = (productId, productData) => {
//     setSelectedProductId(productId);
//     setSelectedProductData(productData);
//     setIsEditing(true);
//   }

//   const handleModalClose = () => {
//     setIsEditing(false);
//     setSelectedProductId(null);
//     setSelectedProductData({});
//   }

//   const handleSave = async (updatedProduct) => {
//     await updateProductInFirestore(selectedProductId, updatedProduct);
//     // Fetch the products again or update the local state, whichever you prefer
//     const updatedProducts = await fetchProductsFromFirestore();
//     setProducts(updatedProducts);
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Admin Product Management</h1>
//       {Object.entries(products).map(([category, categoryProducts]) => (
//         <div key={category} className="mb-6">
//           <h2 className="text-xl mb-2 capitalize">{category}</h2>
//           <div className="bg-white p-4 rounded shadow-md space-y-2">
//             {Object.entries(categoryProducts).map(([productId, productData]) => (
//               <div key={productId} className="border-b pb-2">
//                 {Object.entries(categoryProducts).map(([productId, productData]) => (
//               <div key={productId} className="border-b pb-2">
//                 <h3 className="font-medium">{productData.title}</h3>
//                 <img src={productData.mainImageUrl} alt={productData.title} className="mb-2 w-full h-56 object-cover"/>
//                 <p>Brand: {productData.brand}</p>
//                 <p>Year: {productData.Year}</p>
//                 <p>Type: {productData.Type}</p>
//                 <p>Model: {productData.model}</p>
//                 <p>Condition: {productData.cond}</p>
//                 <p>Description: {productData.description}</p>
//                 <p>Price: ${productData.price}</p>
//                 <p>Stock: {productData.stock}</p>
//                 <p>Sex: {productData.sex}</p>
//                 <button onClick={() => handleEditClick(productId, productData)} className="bg-blue-500 text-white p-2 rounded mt-2">Edit</button>
//               </div>
//             ))}
//                 {/* <button onClick={() => handleEditClick(productId, productData)} className="bg-blue-500 text-white p-2 rounded mt-2">Edit</button> */}
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//       {isEditing && (
//         <EditProductModal 
//           product={selectedProductData} 
//           onClose={handleModalClose} 
//           onSave={handleSave}
//         />
//       )}
//     </div>
//   );
// }

// export default ProductsAdm;
