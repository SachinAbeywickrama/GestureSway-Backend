/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import './LoginPage.css';
import userIcon from '../assets/person.png';
import emailIcon from '../assets/email.png';
import passwordIcon from '../assets/password.png';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        age: '' 
    });
    const [action, setAction] = useState('Sign In');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation checks
        if (action === 'Sign Up' && !formData.username) {
            alert('Please enter a username.');
            return;
        }
        if (!formData.email) {
            alert('Please enter an email address.');
            return;
        }
        if (!formData.password) {
            alert('Please enter a password.');
            return;
        }
        if (action === 'Sign Up' && (!formData.age || isNaN(formData.age) || formData.age < 0)) {
            alert('Please enter a valid age.');
            return;
        }

        // Check for invalid input
        if (action === 'Sign Up' && isNaN(formData.age)) {
            alert('Invalid input for age. Please enter a number.');
            return;
        }

        try {
            if (action === 'Sign In') {
                const response = await axios.post('http://localhost:3001/login', { email: formData.email, password: formData.password });
                alert(response.data);
                setIsLoggedIn(true); // Set login status to true
            } else {
                const response = await axios.post('http://localhost:3001/register', { 
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    age: formData.age 
                });
                alert(response.data);
                setIsLoggedIn(true); // Set login status to true
                // Clear form data after successful signup
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    age: '' 
                });
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('Wrong credentials. Please try again.');
        }
    };

    return (
        <div>
            <Navbar/>
            {isLoggedIn ? (
                <div style={{ textAlign: 'left', marginTop: '20px' }}>
                    <div style={{ border: '3px solid black', padding: '20px', maxWidth: '500px', margin: '0 auto', marginBottom: '120px', marginTop: '150px'}}>
                        <h2>Game Controls</h2>
                        <h3>How to play the Snake Game</h3>
                        <ul>
                             <li>Be in a position where the web cam clearly detects your hand gestures.</li>
                             <li> Gestures used 
                                <ol>
                                <li>Open Palm - Snake moves up</li>
                                <li>Closed fist - Snake moves down</li>
                                <li>Open Palm to Right - Snake moves right</li>
                                <li>Open Palm to left - Snake moves to the left</li>
                                </ol>
                             </li>
                             <li> Enter Q to quit the Game </li>
                             </ul>
                          
                        <Link to="/SnakeGame">
                            <button className="play-button">
                                Play Game
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className='login-container'> 
                    <div className="login-body">
                        <div className="containerL">
                            <div className="header">
                                <div className="text">{action === 'Sign In' ? 'Sign In' : 'Sign Up'}</div>
                                <div className="underline"></div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="inputs">
                                    {action === 'Sign Up' && (
                                        <div className="input">
                                            <img src={userIcon} alt="Username" />
                                            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
                                        </div>
                                    )}
                                    <div className="input">
                                        <img src={emailIcon} alt="Email" />
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                                    </div>
                                    <div className="input">
                                        <img src={passwordIcon} alt="Password" />
                                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                                    </div>
                                    {action === 'Sign Up' && (
                                        <div className="input">
                                            <img src={userIcon} alt="Age" />
                                            <input type="text" name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
                                        </div>
                                    )}
                                    <div className="submit-container">
                                        {/* Increase length of the first submit button */}
                                        <button className="submit" style={{ width: '420px', backgroundColor: 'black' }} type="submit">{action}</button>
                                    </div>
                                </div>
                            </form>
                            <div className="submit-container">
                                <button className={action === 'Sign In' ? 'submit gray' : 'submit'} onClick={() => setAction('Sign In')}>
                                    Sign In
                                </button>
                                <button className={action === 'Sign Up' ? 'submit gray' : 'submit'} onClick={() => setAction('Sign Up')}>
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer/>
        </div>
    );
};

export default LoginPage;
