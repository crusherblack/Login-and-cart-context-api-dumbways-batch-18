import React, { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  carts: [
    {
      id: 1,
      name: "Celana Panjang",
    },
    {
      id: 2,
      name: "Baju Kemeja",
    },
    {
      id: 3,
      name: "Sepatu ",
    },
  ],
  isLogin: false || localStorage.getItem("isLogin"),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("isLogin", true);

      return {
        ...state,
        isLogin: true,
      };
    case "LOGOUT":
      localStorage.removeItem("isLogin");

      return {
        ...state,
        isLogin: false,
      };
    default:
      throw new Error();
  }
};

export const CartContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={[state, dispatch]}>
      {props.children}
    </CartContext.Provider>
  );
};
