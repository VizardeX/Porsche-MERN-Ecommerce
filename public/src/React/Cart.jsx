import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [message, setMessage] = useState('');
    const customerToken = localStorage.getItem('customerToken');
    const navigate = useNavigate();

    // Fetch cart contents when the component mounts
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/order', {
                    headers: {
                        Authorization: `Bearer ${customerToken}`,
                    },
                });
                console.log(response.data.cartDetail); // Log the cart detail data
                setCartItems(response.data.cartDetail);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };
    
        fetchCartItems();
    }, [customerToken]);
    

    // Function to remove product from cart
    const handleRemoveFromCart = async (productId) => {
        try {
            const response = await axios.delete('http://localhost:5000/api/v1/order', {
                data: { productId },
                headers: {
                    Authorization: `Bearer ${customerToken}`,
                },
            });
            setMessage(response.data.msg);
            // Update the cart items state after removal
            setCartItems(cartItems.filter(item => item.productId !== productId));
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.productId}>
                            <p>ProductId: {item.productId}</p>
                            <button onClick={() => handleRemoveFromCart(item.productId)}>Remove</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty</p>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Cart;
