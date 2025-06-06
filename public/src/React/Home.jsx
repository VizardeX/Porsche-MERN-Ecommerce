import React from 'react';
import './Frontend/CSS/Home.css'; // Import the CSS file
import homePNG from './Images/home.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import v from './Video/sexy2.mp4'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Home = ({ isLoggedIn, isAdmin }) => {
    const navigateTo = (link) => {
        // Your navigation logic here
    };

    return (
        <>
            <div className="content-container">
                <video autoPlay loop muted playsInline className="back-video">
                    <source src={v} type="video/mp4" />
                </video>
                <img id="porscheLogo" src={homePNG} alt="Porsche Logo"></img>
                <div className="text-content">
                    <h1>Welcome to Porsche</h1>
                    <p>Thank you for visiting! Feel free to explore and enjoy the content.</p>
                </div>
            </div>

         </>
    );
};

export default Home;
