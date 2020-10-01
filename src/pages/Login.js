import React, { useState, useContext } from "react";
import { CartContext } from "../context/cartContext";

const Login = () => {
  const [state, dispatch] = useContext(CartContext);

  const [formData, setFormData] = useState({
    email: "fadhildarm13@gmail.com",
    password: "123456",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "fadhildarm13@gmail.com" && password === "123456") {
      console.log("LOGIN SUCCESS");
      dispatch({
        type: "LOGIN",
      });
    } else {
      console.log("LOGIN GAGAL");
    }
  };

  return (
    <div className="container">
      <div className="card mt-3">
        <div className="card-header  bg-info text-white">
          <h2>Login Screen</h2>
        </div>
        <div className="card-body">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                placeholder="Please input your email"
                type="text"
                name="email"
                value={email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                placeholder="Please input your Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </div>
          </form>
          <h1 className="text-success">
            {state.isLogin ? "LOGIN STATE" : "NOT LOGIN STATE"}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
