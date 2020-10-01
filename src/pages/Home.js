import React, { useContext } from "react";
import { CartContext } from "../context/cartContext";

const Home = () => {
  const [state, dispatch] = useContext(CartContext);
  return <h1>INI HOME: {JSON.stringify(state)}</h1>;
};

export default Home;
