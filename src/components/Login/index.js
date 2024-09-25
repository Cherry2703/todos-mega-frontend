
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // Effect to check for existing JWT token and redirect if found
  useEffect(() => {
    const jwtToken = Cookies.get('jwtToken');
    if (jwtToken) {
      navigate('/'); // Redirect to home if JWT token exists
    }
  }, [navigate]);

  const onClickLogin = async () => {
    if (!username || !password) {
      setErrorMsg('Username and password are required.');
      return;
    }

    const userDetails = { username, password };
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch('https://todos-2-k8dk.onrender.com/users/login', options);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Handle successful login (e.g., set JWT, navigate to home)
        Cookies.set('jwtToken', data.jwtToken, { expires: 30, path: '/' });
        navigate('/'); // Redirect to home or desired page
      } else {
        setErrorMsg(data.error_msg || 'Login failed. Please try again.');
      }
    } catch (error) {
      setErrorMsg('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button onClick={onClickLogin} className="login-button">Login</button>
        <div>
           <p>Didn't have an account? <Link to={`/signup`}>Sign Up Here</Link></p>
        </div>
        {errorMsg && <p className="error-message">{errorMsg}</p>}
      </div>
    </div>
  );
};

export default Login;
