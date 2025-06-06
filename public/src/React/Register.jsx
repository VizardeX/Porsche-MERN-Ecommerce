import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
//import './Frontend/CSS/navbar.css';
import './Frontend/CSS/Register2.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleRegister = async (event) => {
        event.preventDefault();
        console.log('Registering...');

        try {
            const response = await axios.post('http://localhost:5000/api/v1/register', {
                name: username,
                email: email,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Registration successful:', response.data);
            alert('Registration successful')

            navigate('/login');

        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again')
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const navigateToRegister = () => {
        navigate('/login'); // Use navigate to navigate to login page
    };

    return (
        <>

            <form id="form1" onSubmit={handleRegister}>
                <section>
                    <div className="form-box">
                        <div className="form-value">
                            <h2>Register</h2>
                            <div className="inputbox">
                                <ion-icon name="person-outline"></ion-icon>
                                <input type="text" id="Username" value={username} onChange={handleUsernameChange} required />
                                <label htmlFor="Username">Username</label>
                            </div>
                            <div className="inputbox">
                                <ion-icon name="mail-outline"></ion-icon>
                                <input type="email" id="Email" value={email} onChange={handleEmailChange} required />
                                <label htmlFor="Email">Email</label>
                            </div>
                            <div className="inputbox">
                                <ion-icon name="lock-closed-outline"></ion-icon>
                                <input type="password" id="Password" value={password} onChange={handlePasswordChange} required />
                                <label htmlFor="Password">Password</label>
                            </div>

                            <button id="RegisterButton" type="submit">Register</button>
                            <div className="register">
                                <p>Already Logged in? <a href='#' onClick={navigateToRegister}>Login Now</a></p>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
        </>
    );
};

export default Register;
