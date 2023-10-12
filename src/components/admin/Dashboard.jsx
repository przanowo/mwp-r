import React, { useEffect, useState } from 'react';
import { CountAllProducts } from '../../firebase';

const Dashboard = () => {
  const [allProductsCount, setAllProductsCount] = useState();

  useEffect(() => {
    const CountAllProductsFromFirestore = async () => {
      const totalNumberOfProducts = await CountAllProducts();
      console.log(totalNumberOfProducts);
      setAllProductsCount(totalNumberOfProducts);
    }
    CountAllProductsFromFirestore();
  }, []);


  return (
    <>
    <div className="">
      <h1>All Products:</h1>
      <h1>{allProductsCount}</h1>
    </div>
    <div>
      <h1></h1>
    </div>
    </>
  )

  // return (
  //   <div className="bg-gray-100 min-h-screen p-5">
  //     <div className="mb-8">
  //       <h1 className="text-2xl font-bold mb-4">Product Counts by Category</h1>
  //       <ul className="bg-white p-4 rounded shadow-md space-y-2">
  //         {Object.keys(products).map(category => (
            
  //           <li key={category} className="flex justify-between">
  //             <span className="capitalize">{category}</span>
  //             <span>{Object.keys(products[category]).length}</span>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>

  //     <div>
  //       <h1 className="text-2xl font-bold mb-4">Total Value of Products by Category</h1>
  //       {Object.entries(products).map(([category, categoryProducts]) => (
  //         <div key={category} className="mb-6">
  //           <h2 className="text-xl mb-2 capitalize">{category}</h2>
  //           <div className="bg-white p-4 rounded shadow-md space-y-2">
  //             <div className="border-b pb-2">
  //             Total Value: ${Object.values(categoryProducts).reduce((acc, product) => acc + Number(product.price), 0)}
  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>

  // );
};

export default Dashboard;
