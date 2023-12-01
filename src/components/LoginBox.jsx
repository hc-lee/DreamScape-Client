import React from 'react';
import '../styles/LoginBox.css';
import personIcon from '../assets/icons8-person-64.png';
import lock from '../assets/lock.png';

function LoginBox({ onLoginButtonClick }) {

    // Event handler for the login button click. Let user know it doesn't work.
    const handleLoginButtonClick = () => {
        window.alert('Not implemented yet!');
    };

    const handleGuestButtonClick = () => {
        onLoginButtonClick();
    };


    return (
        <>
            <div className="circle">
                <img className="main-icon" src={personIcon} alt="Person Logo" />
            </div>
            <div className="login-field">
                <div className="icon">
                    <img className="icon-image" src={personIcon} alt="Person Logo" />
                </div>
                <input className="login-text" type="text" placeholder="username" />
            </div>

            <div className="login-field">
                <div className="icon">
                    <img className="icon-image" src={lock} alt="Lock Icon" />
                </div>
                <input className="login-text" type="password" placeholder="**********" />
            </div>

            <button className="login-button" onClick={handleLoginButtonClick}>
                login
            </button>
            <button className="guest-button" onClick={handleGuestButtonClick}>
                guest user
            </button>
        </>
    );
}

export default LoginBox;