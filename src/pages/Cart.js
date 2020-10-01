import React, { useContext } from "react";
import { CartContext } from "../context/cartContext";

const Cart = () => {
  const [state, dispatch] = useContext(CartContext);
  return (
    <div>
      <h1>INI CART: {JSON.stringify(state)}</h1>
    </div>
  );
};

export default Cart;
