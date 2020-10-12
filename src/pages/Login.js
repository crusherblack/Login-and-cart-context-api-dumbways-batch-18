import React, { useState, useContext } from "react";
import { CartContext } from "../context/cartContext";
import { API, setAuthToken } from "../config/api";

const Login = () => {
  const [state, dispatch] = useContext(CartContext);

  const [formData, setFormData] = useState({
    email: "dumbways@gmail.com",
    password: "12345678",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await API.post("/login", body, config);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data.data,
      });

      console.log(res);

      setAuthToken(res.data.data.token);

      try {
        const res = await API.get("/auth");

        dispatch({
          type: "USER_LOADED",
          payload: res.data.data.user,
        });
      } catch (err) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }
    } catch (err) {
      dispatch({
        type: "LOGIN_FAIL",
      });
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
