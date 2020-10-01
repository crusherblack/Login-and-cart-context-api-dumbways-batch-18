import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CartContextProvider } from "./context/cartContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Detail from "./pages/Detail";

import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <CartContextProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/cart" component={Cart} />
          <PrivateRoute exact path="/detail/:id" component={Detail} />
        </Switch>
      </BrowserRouter>
    </CartContextProvider>
  );
};

export default App;
