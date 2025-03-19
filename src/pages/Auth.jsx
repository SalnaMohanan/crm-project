import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FloatingLabel, Form, Spinner } from 'react-bootstrap';
import './auth.css';

const Auth = ({ insideRegister }) => {
  // Store user input data
  const [inputData, setInputData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API request (Replace this with actual authentication API)
    setTimeout(() => {
      setIsLoading(false);
      console.log(`${insideRegister ? "Registered" : "Logged in"} successfully:`, inputData);
    }, 2000);
  };

  return (
    <div className="login-page">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="shadow card p-4 bg-transparent" style={{ maxWidth: '90%', width: '400px' }}>
          <h5 className="text-center text-light">CRM</h5>
          <h6 className="text-center text-light">
            Sign {insideRegister ? "up" : "in"} to your Account
          </h6>

          <Form onSubmit={handleSubmit}>
            {insideRegister && (
              <>
                <FloatingLabel controlId="floatingUserName" label="Username" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    required
                    onChange={(e) => setInputData({ ...inputData, username: e.target.value })}
                  />
                </FloatingLabel>

                <FloatingLabel controlId="floatingRole" label="Role" className="mb-3">
                  <Form.Select
                    required
                    onChange={(e) => setInputData({ ...inputData, role: e.target.value })}
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="manager">Manager</option>
                    <option value="salesperson">Salesperson </option>
                  </Form.Select>
                </FloatingLabel>
              </>
            )}

            <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
              <Form.Control
                type="email"
                placeholder="name@example.com"
                required
                onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
              />
            </FloatingLabel>

            <button type="submit" className="btn btn-warning w-100 mb-2" disabled={isLoading}>
              {insideRegister ? "Register" : "Login"}
              {isLoading && <Spinner animation="border" variant="danger" size="sm" className="ms-2" />}
            </button>
          </Form>

          <p className="text-light text-center mt-2">
            {insideRegister ? (
              <>
                Already a user? <Link to="/login" className="link-warning">Login</Link>
              </>
            ) : (
              <>
                New user? <Link to="/register" className="link-warning">Register</Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
