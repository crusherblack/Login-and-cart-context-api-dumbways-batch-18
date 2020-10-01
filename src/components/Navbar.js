import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cartContext";

const Navbar = () => {
  const [state, dispatch] = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        DumbWays.ID
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/home">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">
              Cart || {state.carts.length}
            </Link>
          </li>
          <li className="nav-item">
            {state.isLogin ? (
              <a
                className="nav-link"
                href="#"
                onClick={() =>
                  dispatch({
                    type: "LOGOUT",
                  })
                }
              >
                Logout
              </a>
            ) : (
              <Link className="nav-link" to="/">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
