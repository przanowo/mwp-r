import React, { useState, useRef  } from 'react';
import { addProductToFirestore, uploadImage } from '../../firebase'; 

const ProductUpload = () => {
    const [product, setProduct] = useState({
        cond: "",
        sex: "",
        category: "",
        brand: "",
        model: "",
        price: "",
        stock: "",
        mL: "",
        title: "",
        description: "",
        Year: "",
        Type: "",
        box: "",
    });

    const fileInputRef = useRef(null);

    const [images, setImages] = useState([]);
    const [mainImageIndex, setMainImageIndex] = useState(0); // Initially, the first image is the main image
    const [formType, setFormType] = useState('parfum');  // Define a new state to handle form type

    const handleImagesChange = (e) => {
        const selectedImages = [...e.target.files];
        setImages(selectedImages);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
        console.log(product);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrls = [];
        for (let image of images) {
            const imageUrl = await uploadImage(image, product.category);
            imageUrls.push(imageUrl);
        }
      
        product.imageUrls = imageUrls;
        product.mainImageUrl = imageUrls[mainImageIndex]; // Setting the main image URL
      
        const result = await addProductToFirestore(product);
        console.log('result:',result, 'product:', product);
    
        
        if (result.success) {
            // Clear the form if product was added successfully
            setProduct({
                cond: "",
                sex: "",
                category: "",
                brand: "",
                model: "",
                price: "",
                stock: "",
                mL: "",
                title: "",
                description: "",
                Year: "",
                Type: "",
                box: "",
                
            });
            setImages([]);  // This line clears the image inputs
            setMainImageIndex(0);  // Resetting the main image index to 0
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            } // This change should clear the "3 files" or any similar indication after successful submission.
            alert(result.message);
        } else {
            alert("Error: " + result.message);
        }
    };

    return (
        <div className="flex justify-center items-center bg-gray-200 mt-10">
             <div className="flex flex-col mb-4">
                <button
                    onClick={() => setFormType('parfum')}
                    className="m-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Parfum Upload
                </button>
                <button
                    onClick={() => setFormType('soapPowder')}
                    className=" m-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Soap & Powder Upload
                </button>

            </div>



            {formType === 'soapPowder' ? (
                    <form className="bg-white p-6 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 py-2" htmlFor="category">
                            Category:
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            required>
                            <option value="" disabled >Select an option</option>
                            <option value="soapandpowder">Soap & Powder</option>
                            <option value="gift">Gift</option>
                            <option value="gold">Gold</option>
                        </select>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cond">
                            Condition:
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="cond"
                            value={product.cond}
                            onChange={handleChange}
                            required>
                            <option value="" disabled >Select an option</option>
                            <option value="new">New</option>
                            <option value="used">Used</option>
                        </select>
                        {['price', 'stock', 'title', 'description', ].map((field, idx) => (
                        <div key={idx} className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
                                {field.charAt(0).toUpperCase() + field.slice(1)}:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type={field === 'price' || field === 'stock' ? 'number' : 'text'}
                                name={field}
                                value={product[field]}
                                onChange={handleChange}
                                required
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
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                                >
                                Upload
                            </button>
                        </div>
                    </form>
                ) :  // parfumform

                <form className="bg-white p-6 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cond">
                        Condition:
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="cond"
                        value={product.cond}
                        onChange={handleChange}
                        required>
                        <option value="" disabled >Select an option</option>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                    </select>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sex">
                        Sex:
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="sex"
                        value={product.sex}
                        onChange={handleChange}
                        required>
                        <option value="" disabled >Select an option</option>
                        <option value="man">Man</option>
                        <option value="woman">Woman</option>
                        <option value="unisex">Unisex</option>
                    </select>
                    <label className="block text-gray-700 text-sm font-bold mb-2 py-2" htmlFor="category">
                        Category:
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required>
                        <option value="" disabled >Select an option</option>
                        <option value="sample">Sample</option>
                        {/* <option value="sampleR">Sample refilled</option> */}
                        {/* <option value="miniatureB">Miniature with box</option> */}
                        <option value="miniature">Miniature</option>
                        <option value="vintage">Vintage</option>
                        <option value="parfum">Parfum</option>
                    </select>

                    { product.category === 'miniature' && (
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 py-2" htmlFor="box">
                            Miniature box:
                        </label> 
                        <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required>
                            <option value=" " disabled >Select an option</option>
                            <option value={false}>Miniature without box</option>
                            <option value={true}>Miniature with box</option>
                        </select>
                        </div>
                    ) }
                    <label className="block text-gray-700 text-sm font-bold mb-2 py-2" htmlFor="Type">
                        Type:
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="Type"
                        value={product.Type}
                        onChange={handleChange}
                        required>
                        <option value="" disabled >Select an option</option>
                        <option value="edt">Eau de Toilette</option>
                        <option value="edp">Eau de Parfum</option>
                        <option value="edc">Eau de Cologne</option>
                        <option value="parfum">Parfum</option>
                    </select>
                </div>

            {['brand', 'model', 'price', 'stock', 'mL', 'title', 'description', 'Year'].map((field, idx) => (
                <div key={idx} className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type={field === 'price' || field === 'stock' || field === 'mL' || field === 'Year' ? 'number' : 'text'}
                        name={field}
                        value={product[field]}
                        onChange={handleChange}
                        required
                    />
                </div>
            ))}

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
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    >
                    Upload
                </button>
            </div>
        </form>
        }
    </div>

    );
};

export default ProductUpload;