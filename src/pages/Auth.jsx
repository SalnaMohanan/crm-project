

import React, { useState } from 'react';
import { FloatingLabel, Form, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import { loginAPI, registerAPI } from '../services/allAPI';

const Auth = ({ insideRegister }) => {
  const navigate = useNavigate();

  // Store user input data
  const [inputData, setInputData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLogined, setIsLogined] = useState(false);

  console.log(inputData);

  // Register function
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Inside handleRegister");

    if (inputData.username && inputData.email && inputData.password && inputData.role) {
      try {
        const result = await registerAPI(inputData);
        console.log(result);

        if (result?.message) { // Check if API response contains success message
          // alert(`Welcome , please login to explore more!`);
          navigate('/login');
          setInputData({ username: '', email: '', password: '', role: '' });
        }
      } catch (err) {
        console.error(err);
        if (err.response?.status === 406) {
          alert(err.response.data); // Display error message from backend
          setInputData({ username: '', email: '', password: '', role: '' });
        } else {
          alert("Registration failed. Please try again.");
        }
      }
    } else {
      alert("Please fill out the form completely.");
    }
  };

  // Login function
  const handleLogin = async (e) => {
    e.preventDefault();

    if (inputData.email && inputData.password) {
      try {
        const result = await loginAPI(inputData);

        if (result?.status === 200) {
          const { user, token } = result.data;
          sessionStorage.setItem("user", JSON.stringify(user));
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("role", user.role);

          setIsAuthorized(true);
          setIsLogined(true);

          setTimeout(() => {
            setInputData({ username: '', email: '', password: '' });

            // Redirect based on role
            if (user.role === "manager") {
                          navigate('/manager-dashboard');
                        } else {
                          navigate('/sale-dashboard');
                        }

            setIsLogined(false);
          }, 2000);
        }
      } catch (err) {
        console.error(err);
        if (err.response?.status === 404) {
          alert(err.response.data);
        } else {
          alert("Login failed. Please check your credentials and try again.");
        }
      }
    } else {
      alert("Please fill out the form completely.");
    }
  };

  return (
    <div className='login-page'>
      <div className='container d-flex justify-content-center align-items-center vh-100'>
        <div className='shadow card p-2 bg-transparent' style={{ width: '400px' }}>
          <h5 className='text-center text-light'>CRM</h5>
          <h6 className='text-center text-light'>
            Sign {insideRegister ? "up" : "in"} to your Account
          </h6>

          {insideRegister && (
            <>
              <FloatingLabel controlId="floatingUserName" label="UserName" className="mb-3">
                <Form.Control 
                  onChange={e => setInputData({ ...inputData, username: e.target.value })} 
                  type="text" 
                  placeholder="Username" 
                  required 
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingrole" label="Role" className="mb-3">
                <Form.Select 
                  onChange={e => setInputData({ ...inputData, role: e.target.value })} 
                  required
                >
                 <option value="" disabled>Select Role</option>
               <option value="manager">Manager</option>
                 <option value="salesperson">Salesperson </option>
                </Form.Select>
              </FloatingLabel>
            </>
          )}

          <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3 ">
            <Form.Control 
              onChange={e => setInputData({ ...inputData, email: e.target.value })} 
              type="email" 
              placeholder="name@example.com" 
              required 
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
            <Form.Control 
              onChange={e => setInputData({ ...inputData, password: e.target.value })} 
              type="password" 
              placeholder="Password" 
              required 
            />
          </FloatingLabel>

          {insideRegister ? (
            <div className='m-3'>
              <button onClick={handleRegister} className='btn btn-warning mb-2'>Register</button>
              <p className='text-light'>
                Already a user? Please click here to <Link to={'/login'} className='link-warning'>Login</Link>
              </p>
            </div>
          ) : (
            <div>
              <button onClick={handleLogin} className='btn btn-warning m-3 text-center'>Login
                {
                  isLogined && <Spinner animation="border" variant="danger" />
                  }
              </button>

              <p className='text-light'>
                New user? Please click here to <Link to={'/register'} className='link-warning'>Register</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;