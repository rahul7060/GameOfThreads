import React, { useState } from 'react'; // Import useState
import { useLoaderData, useNavigate } from "react-router-dom";

const Product = () => {
    const { products, total } = useLoaderData() || { products: [], total: 0 }; // Fallback for empty data
    const navigate = useNavigate();
    const [page, setPage] = useState(1); // Initialize page state
   

    // Check if products data is available
    console.log("Loaded Products:", products);

    const updatePage = (e) => {
        const newPage = parseInt(e.target.textContent);
        setPage(newPage);
        navigate(`/products/pages/${newPage}`);
    };

    const previousPage = () => {
        if (page > 1) {
            const newPage = page - 1;
            setPage(newPage);
            navigate(`/products/pages/${newPage}`);
        }
    };

    const nextPage = () => {
        if (page < Math.ceil(total / 5)) {
            const newPage = page + 1;
            setPage(newPage);
            navigate(`/products/pages/${newPage}`);
        }
    };

    const productDetail = (id) => {
        if (!id) {
            console.error("Error: Product ID is missing or undefined!");
            return;
        }
        
        console.log("Navigating to Product Page with ID:", id);
        navigate(`/UserDashboard/productPage/${id}`);
    };
    
    

    return (
        <div className="flex flex-wrap">
            {products.length === 0 ? (
                <div>No products found.</div>
            ) : (
                products.map((product, index) => (
                    <div key={product._id} onClick={()=>productDetail(product._id)} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
                        <div className="bg-white rounded-lg shadow-lg">
                            <div className="p-2">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-64 object-cover rounded-t-lg"
                                />
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p className="text-sm text-gray-600">{product.description}</p>
                                <p className="text-lg font-semibold text-gray-800">${product.price}</p>
                            </div>
                        </div>
                    </div>
                ))
            )}

            {/* Pagination */}
            <div className="w-full p-2">
                <div className="flex justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
                        onClick={previousPage}
                    >
                        Prev
                    </button>

                    {Number.isFinite(total) &&
                        Array.from({ length: Math.ceil(total / 5) }, (_, i) => i + 1).map((pageNum) => (
                            <button
                                key={pageNum}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                                onClick={updatePage}
                            >
                                {pageNum}
                            </button>
                        ))}

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                        onClick={nextPage}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
