import React, { useState, useEffect } from 'react';
import './Frontend/CSS/Products.css'; // Import the CSS file
import Navbar from './Navbar'; // Import the Navbar component

const Products = () => {
    // State variable to store products
    const [products, setProducts] = useState([]);

    // Function to fetch products from the API
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/product');
            const data = await response.json();
            if (data && data.products) {
                setProducts(data.products);
            } else {
                console.error('Products not found in response:', data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Fetch products from the API when the component mounts
    useEffect(() => {
        fetchProducts();
    }, []); // Run this effect only once after the component mounts

    const HandleCart = async (product) => {
        const customerToken = localStorage.getItem('customerToken');
        if (!customerToken) {
            alert('You need to be logged in to add items to the cart.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/v1/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${customerToken}`,
                },
                body: JSON.stringify({ productId: product._id }),
            });

            if (response.ok) {
                alert('Product added to cart successfully!');
            } else {
                const errorData = await response.json();
                console.error('Error adding product to cart:', errorData);
                alert('Failed to add product to cart.');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('An error occurred while adding the product to cart.');
        }
    };

    return (
        <>

            <div className="products-container">
                <h2 style={{ color: 'green' }}>All Products</h2>
                <div className="products-list-container">
                    <ul className="products-list">
                        {products.map(product => (
                            <li key={product._id} className="product-item">
                                <h3>{product.name}</h3>
                                <p className="product-description">Description: {product.description}</p>
                                <p>Price: ${product.price}</p>
                                <p>Stock: {product.stock}</p>
                                <button onClick={() => HandleCart(product)}>Add to cart</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Products;
