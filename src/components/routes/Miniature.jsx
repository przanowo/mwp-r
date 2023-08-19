import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProductsByCategoryFromFirestore } from '../../firebase'; // Adjust path as necessary
import ProductCard from '../product/ProductCard';
import { useSearch } from '../../hooks/SearchContext';

const Miniature = () => {
    const { searchTerm } = useSearch();
    const [products, setProducts] = useState({
        miniature: {},
        miniatureB: {}
    });

    useEffect(() => {
        const loadProducts = async (category) => {
            console.log('category', category);  
            console.log('products', products);
            const fetchedProducts = await fetchProductsByCategoryFromFirestore(category);

            const productsArray = Object.keys(fetchedProducts).map(productId => ({
                id: productId,
                ...fetchedProducts[productId],
            }));
            setProducts(prevState => ({
                ...prevState,
                [category]: productsArray
            }));
        };

        // Load products from both categories
        loadProducts('miniature');
        loadProducts('miniatureB');
    }, []);

    const filteredProducts = (categoryProducts) => {
        return Object.keys(categoryProducts).filter((productId) => {
          const product = categoryProducts[productId];
          return product.title.toLowerCase().includes(searchTerm.toLowerCase());
        });
      };

    return (
        <div className="flex-grow container mx-auto p-4">
            {Object.keys(products).map((category) => (
                <div key={category} className="mb-8">
                    <Link to={`/shop/${category}`} className="block mb-4">
                      <h2 className="text-2xl uppercase font-semibold mb-4">
                        {category === 'miniature' ? 'Miniature parfums without box' : (category === 'miniatureB' ? 'Miniature parfums with box' : category)}
                      </h2>
                    </Link>
                    <div className="grid grid-cols-4 gap-4">
                        {products[category] && Object.keys(products[category]) && filteredProducts(products[category]).map((productId) => {
                            const product = products[category][productId];
                            return (
                                <div key={productId} className="border rounded shadow p-4 hover:border-gray-400 hover:shadow-lg transition duration-200 ease-in">
                                    <ProductCard product={product} category={product.categoryId} productId={product.id} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Miniature;
