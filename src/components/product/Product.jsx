import React from 'react';
import { useParams } from 'react-router-dom';
// import data from '../routes/productData'; // Import data from productData.js
import { fetchProductFromFirestore } from '../../firebase';
import { useEffect, useState } from 'react';

const Product = () => {
  const { category, productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const fetchedProduct = await fetchProductFromFirestore(category, productId);
      setProduct(fetchedProduct);
    };

    loadProduct();
  }, [category, productId]);


  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-md">
      <div className="flex">
        <div className="w-1/2 pr-4">
          <img src={product.mainImageUrl} alt={product.title} className="w-full h-96 object-cover mb-4 rounded-md" />
          <div className="grid grid-cols-3 gap-2">
            {product.imageUrls.map((url, idx) => (
              <img key={idx} src={url} alt={`Product ${idx}`} className="w-full h-24 object-cover rounded-md" />
            ))}
          </div>
        </div>
        <div className="w-1/2 pl-4">
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-bold mb-2">${product.price}</p>
          <p className="mb-2"><span className="font-semibold">Brand:</span> {product.brand}</p>
          <p className="mb-2"><span className="font-semibold">Model:</span> {product.model}</p>
          <p className="mb-2"><span className="font-semibold">mL:</span> {product.ml}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
