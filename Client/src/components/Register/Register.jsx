// src/pages/Register.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          withCredentials:true
        }
      );
      if (res.data.newUser) {
        dispatch(loginSuccess(res.data.newUser));
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="register-outer">
      <div className="register-inner">
        <h5>Register</h5>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              placeholder="Username"
              id="name"
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Email Address"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              id="password"
              onChange={handleChange}
            />
            <p className="show" onClick={() => setShow(!show)}>
              <FaRegEye />
            </p>
          </div>
          <div className="input-container">
            <input
              type={show ? "text" : "password"}
              placeholder="Re-enter Password"
              id="confirmPassword"
              onChange={handleChange}
            />
            <p className="show" onClick={() => setShow(!show)}>
              <FaRegEye />
            </p>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">REGISTER</button>
        </form>
        <Link to="/login">Log in to your account!</Link>
      </div>
    </div>
  );
};

export default Register;
