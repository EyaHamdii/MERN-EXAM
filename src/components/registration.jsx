import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./log_reg.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/signup", inputValue)
      .then((response) => {
        navigate("/pets");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.errors) {
          const errorResponse = error.response.data.errors;
          const errorArr = Object.values(errorResponse);
          setErrors(errorArr);
        } else {
          console.log(error);
        }
      })
      .finally(() => {
        setInputValue({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
      });
  };

  return (
    <div className="body">
      <div className="form_container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          {errors.map((error, index) => (
            <p key={index} className="text-danger">
              {error}
            </p>
          ))}
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              placeholder="Enter your username"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">lastName</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              placeholder="Enter your username"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>
          <button type="submit">Submit</button>

        </form>
      </div>
    </div>
  );
};

export default Signup;
