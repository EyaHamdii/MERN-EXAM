import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./log_reg.css";

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputValue;

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
      .post("http://localhost:8000/login", inputValue)
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
          email: "",
          password: ""
        });
      });
  };

  return (
    <div className="body">
      <div className="form_container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {errors.map((error, index) => (
            <p key={index} className="text-danger">
              {error}
            </p>
          ))}
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

export default Login;