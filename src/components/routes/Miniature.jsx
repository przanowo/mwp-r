import React from 'react'
import Category from './Category'

const Miniature = () => {
  return (
    <div>
        <Category category='miniature' />
    </div>
  )
}

export default Miniature


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { fetchProductsByCategoryFromFirestore } from '../../firebase'; // Adjust path as necessary
// import ProductCard from '../product/ProductCard';

// const Miniature = () => {
//     const [products, setProducts] = useState({
//         miniature: {},
//         miniatureB: {}
//     });
//     const [lastProduct, setLastProduct] = useState(null);
//     const [allProductsLoaded, setAllProductsLoaded] = useState(false);

//     useEffect(() => {
//         const loadProducts = async (category) => {

//             const { allProducts, lastVisible } = await fetchProductsByCategoryFromFirestore(category);
//             setProducts(allProducts);
//             setLastProduct(lastVisible);
//             if (!lastVisible) {
//                 setAllProductsLoaded(true);
//             }

//             const productsArray = Object.keys(allProducts).map(productId => ({
//                 id: productId,
//                 ...allProducts[productId],
//             }));
//             setProducts(prevState => ({
//                 ...prevState,
//                 [category]: productsArray
//             }));
//         };

//         Load products from both categories
//         loadProducts('miniature');
//         loadProducts('miniatureB');
//     }, []);

//     const loadMoreProducts = async () => {
//         const { allProducts, lastVisible: newLastProduct } = await fetchProductsByCategoryFromFirestore(lastProduct);
        
//         setProducts(prevProducts => {
//           return { ...prevProducts, ...allProducts };
//       });
      
//         setLastProduct(newLastProduct);
      
//         if (!newLastProduct) {
//           setAllProductsLoaded(true);
//         }
//       };

//     return (
//         <div className="flex-grow container mx-auto p-4">
//             {Object.keys(products).map((category) => (
//                 <div key={category} className="mb-8">
//                     <Link to={`/shop/${category}`} className="block mb-4">
//                       <h2 className="text-2xl uppercase font-semibold mb-4">
//                         {category === 'miniature' ? 'Miniature parfums without box' : (category === 'miniatureB' ? 'Miniature parfums with box' : category)}
//                       </h2>
//                     </Link>
//                     <div className="grid grid-cols-4 gap-4">
//                         {products[category] && Object.keys(products[category]).map((productId) => {
//                             const product = products[category][productId];
//                             return (
//                                 <div key={productId} className="border rounded shadow p-4 hover:border-gray-400 hover:shadow-lg transition duration-200 ease-in">
//                                     <ProductCard product={product} category={product.categoryId} productId={product.id} />
//                                 </div>
//                             );
//                         })}
//                     </div>
//                     {!allProductsLoaded && (
//                         <button onClick={loadMoreProducts} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>
//                         Load More
//                         </button>
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default Miniature;
