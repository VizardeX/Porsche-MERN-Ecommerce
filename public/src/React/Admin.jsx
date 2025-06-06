import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Admin = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [productId, setProductId] = useState('');
    const [token, setToken] = useState(''); // State to store the bearer token
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        // Retrieve the token and role from local storage
        const storedToken = localStorage.getItem('adminToken');
        const role = localStorage.getItem('role');
        if (storedToken && role === 'admin') {
            setToken(storedToken);
        } else {
            // Redirect user to login or handle non-admin user
            // Redirect to login page or display message accordingly
            navigate('/login');
        }
    }, []);

    // Function to handle product creation
    const handleCreateProduct = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/product', {
                name,
                description,
                price,
                stock
            }, {
                headers: {
                    Authorization: `Bearer ${token}` // Include the bearer token in the request headers
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    // Function to handle product update
    const handleUpdateProduct = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/v1/product/${productId}`, {
                name,
                description,
                price,
                stock
            }, {
                headers: {
                    Authorization: `Bearer ${token}` // Include the bearer token in the request headers
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Function to handle product deletion
    const handleDeleteProduct = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/v1/product/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Include the bearer token in the request headers
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <>
            <div style={{ backgroundImage: 'url("")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', padding: '20px', color: 'white' }}>
                <h2 style={{ color: 'green' }}>Admin Panel</h2>
                <label style={{ color: 'green' }}   >
                    Product Name:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </label >
                <label style={{ color: 'green' }}>
                    Description:
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
                </label>
                <label style={{ color: 'green' }}>
                    Price:
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
                </label>
                <label style={{ color: 'green' }}>
                    Stock:
                    <input type="number" value={stock} onChange={e => setStock(e.target.value)} />
                </label>
                <label style={{ color: 'green' }}>
                    Product ID (for update/delete):
                    <input type="text" value={productId} onChange={e => setProductId(e.target.value)} />
                </label>
                <button onClick={handleCreateProduct}>Create Product</button>
                <button onClick={handleUpdateProduct}>Update Product</button>
                <button onClick={handleDeleteProduct}>Delete Product</button>
            </div>
        </>
    );
};

export default Admin;
