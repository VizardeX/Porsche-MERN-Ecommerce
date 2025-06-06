import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Frontend/CSS/yy.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log('Logging in...');

        try {
            const response = await axios.post('http://localhost:5000/api/v1/login', {
                email,
                password
            });

            console.log('Login successful:', response.data);
            alert('Login successful')
            // Check if the user is an admin
            if (response.data.role === 'admin') {
                setIsLoggedIn(true);
                setIsAdmin(true);
                localStorage.setItem('adminToken', response.data.token);
                localStorage.setItem('role', response.data.role); // This sets 'admin' as role
                navigate('/admin');
            } else {
                setIsLoggedIn(true); // Update isLoggedIn state to true for regular users
                setIsAdmin(false);
                localStorage.setItem('customerToken', response.data.token);
                localStorage.setItem('role', 'customer'); // Set 'customer' as role for regular users
                navigate('/');
            }


        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again');
        }
    };


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLoginButtonClick = (event) => {
        event.preventDefault();
        handleLogin();
    };

    const navigateToRegister = () => {
        navigate('/register');
    };

    // Logging state values
    console.log('isLoggedIn:', isLoggedIn);
    console.log('isAdmin:', isAdmin);

    return (
        <>

            <form id="form1">
                <section>
                    <div className="form-box">
                        <div className="form-value">
                            <h2>Login</h2>
                            <div className="inputbox">
                                <input type="email" id="Email" value={email} onChange={handleEmailChange} required />
                                <label htmlFor="Email">Email</label>
                            </div>
                            <div className="inputbox">
                                <input type="password" id="Password" value={password} onChange={handlePasswordChange} required />
                                <label htmlFor="Password">Password</label>
                            </div>
                            <button id="LoginButton" onClick={handleLoginButtonClick}>Log in</button>
                            <div className="register">
                                <p>No Account Yet? <a href='#' onClick={navigateToRegister}>Register Now</a></p>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
        </>
    );
};

export default Login;
