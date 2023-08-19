import React, { useState, useEffect } from 'react';
import { fetchProductsFromFirestore } from '../../firebase'; // Replace with the path to your utilities file

const Dashboard = () => {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await fetchProductsFromFirestore();
      setProducts(allProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Product Counts by Category</h1>
        <ul className="bg-white p-4 rounded shadow-md space-y-2">
          {Object.keys(products).map(category => (
            console.log('category', category),
            <li key={category} className="flex justify-between">
              <span className="capitalize">{category}</span>
              <span>{Object.keys(products[category]).length}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-4">Total Value of Products by Category</h1>
        {Object.entries(products).map(([category, categoryProducts]) => (
          <div key={category} className="mb-6">
            <h2 className="text-xl mb-2 capitalize">{category}</h2>
            <div className="bg-white p-4 rounded shadow-md space-y-2">
              <div className="border-b pb-2">
              Total Value: ${Object.values(categoryProducts).reduce((acc, product) => acc + Number(product.price), 0)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
