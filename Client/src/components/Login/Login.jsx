import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../features/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRegEye } from "react-icons/fa";
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [show,setShow] = useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, formData);
      if (res.data && res.data.user && res.data.token) {
        const user = res.data.user;
        const token = res.data.token
        dispatch(loginSuccess({user,token}));

        navigate('/');
      } else {
        setError('Login successful but user data is missing in response.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
         <div className="loader-container">
        <div className="cube-loader">
          <div className="cube cube1"></div>
          <div className="cube cube2"></div>
          <div className="cube cube3"></div>
          <div className="cube cube4"></div>
        </div>
        <p>Loading...</p>
      </div>
      ) : (
        <div className='login-outer'>
          <div className='login-inner'>
            <h5>Log In</h5>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Email"
                  id="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-container">
                <input
                  type={show ? "text":"password"}
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                  required
                />
                <p className="show" onClick={() => setShow(!show)}>
                  <FaRegEye />
                </p>
              </div>
              {error && <p className="error">{error}</p>}
              <button type="submit">LOG IN</button>
            </form>
            <Link to="/register">Create a new account</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
