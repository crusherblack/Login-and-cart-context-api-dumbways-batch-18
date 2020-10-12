import React, { useEffect, useContext } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Detail from "./pages/Detail";
import Crud from "./pages/Crud";
import ApiPublic from "./pages/ApiPublic";
import CrudReactQuery from "./pages/CrudReactQuery";

import PrivateRoute from "./components/PrivateRoute";

import { API, setAuthToken } from "./config/api";

import { CartContext } from "./context/cartContext";

// if token available in localstorage then set default header for auth
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [state, dispatch] = useContext(CartContext);

  useEffect(() => {
    const loadUser = async () => {
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
    };

    loadUser();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/cart" component={Cart} />
        <PrivateRoute exact path="/detail/:id" component={Detail} />
        <PrivateRoute exact path="/crud" component={Crud} />
        <PrivateRoute
          exact
          path="/crud-react-query"
          component={CrudReactQuery}
        />
        <Route exact path="/api-public" component={ApiPublic} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
