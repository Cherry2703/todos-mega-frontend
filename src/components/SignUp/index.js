// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './index.css'; // Import the custom CSS for styling

// const SignUp = () => {
//   const [email, setEmail] = useState('');
//   const [username, setUserName] = useState('');
//   const [location, setLocation] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');
//   const [successMsg, setSuccessMsg] = useState('');
  
//   const navigate = useNavigate();

//   const onClickSignUp = async () => {
//     if (!email || !username || !location || !password) {
//       setErrorMsg('All fields are required.');
//       return;
//     }

  

//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       },
//       body: JSON.stringify({ username, email, password, location }),
//     };

//     try {
//       const response = await fetch('https://todos-2-k8dk.onrender.com/users/', options);
//       const data = await response.json();

//       if (response.ok) {
//         setSuccessMsg('Account created successfully! Redirecting to login...');
//         setTimeout(() => {
//           navigate('/login');
//         }, 2000);
//       } else {
//         setErrorMsg(data.error_msg || 'Sign-up failed. Please try again.');
//       }
//     } catch (error) {
//       setErrorMsg('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <div className="signup-container">
      
//       <div className="signup-form">
//         <h1>Sign Up</h1>
        
//         <div className="input-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(event) => setEmail(event.target.value)}
//             placeholder="Enter your email"
//             required
//           />
//         </div>

//         <div className="input-group">
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(event) => setUserName(event.target.value)}
//             placeholder="Enter your username"
//             required
//           />
//         </div>

//         <div className="input-group">
//           <label htmlFor="location">Location</label>
//           <input
//             type="text"
//             id="location"
//             value={location}
//             onChange={(event) => setLocation(event.target.value)}
//             placeholder="Enter your location"
//             required
//           />
//         </div>

//         <div className="input-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//             placeholder="Enter your password"
//             required
//           />
//         </div>

//         <button onClick={onClickSignUp} className="signup-button">Sign Up</button>
//         {errorMsg && <p className="error-message">{errorMsg}</p>}
//         {successMsg && <p className="success-message">{successMsg}</p>}
//       </div>
//     </div>
//   );
// };

// export default SignUp;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'; // Import the custom CSS for styling

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const navigate = useNavigate();

  const onClickSignUp = async () => {
    console.log('Attempting to sign up...');

    if (!email || !username || !location || !password) {
      setErrorMsg('All fields are required.');
      return;
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ username, email, password, location }),
    };

    try {
      const response = await fetch('https://todos-2-k8dk.onrender.com/users/', options);
      const data = await response.json();
      console.log('Response:', response);
      console.log('Response Data:', data);

      if (response.ok) {
        setSuccessMsg('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setErrorMsg(data.error_msg || 'Sign-up failed. Please try again.');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setErrorMsg('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Sign Up</h1>
        
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter your location"
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

        <button onClick={onClickSignUp} className="signup-button">Sign Up</button>
        {errorMsg && <p className="error-message">{errorMsg}</p>}
        {successMsg && <p className="success-message">{successMsg}</p>}
      </div>
    </div>
  );
};

export default SignUp;
