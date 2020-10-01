import React, { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  carts: [],
  isLogin: false || localStorage.getItem("isLogin"),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CART":
      const filterExistedProduct = state.carts.filter(
        (cart) => cart.id === action.payload.id
      );

      if (filterExistedProduct.length > 0) {
        return {
          ...state,
          carts: state.carts.map((cart) =>
            cart.id === action.payload.id
              ? {
                  ...cart,
                  qty: cart.qty + 1,
                }
              : cart
          ),
        };
      }

      return {
        ...state,
        carts: [
          ...state.carts,
          {
            ...action.payload,
            qty: 1,
          },
        ],
      };

    case "REMOVE_CART":
      return {
        ...state,
        carts: state.carts.filter((cart) => cart.id !== action.payload),
      };

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
