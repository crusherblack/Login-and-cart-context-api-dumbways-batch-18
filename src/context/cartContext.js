import React, { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  carts: [],
  isLogin: false,
  user: null,
  loading: true,
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
    case "USER_LOADED":
      return {
        ...state,
        isLogin: true,
        user: action.payload,
        loading: false,
      };
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
      return {
        ...state,
        isLogin: false,
        user: null,
        loading: false,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        isLogin: true,
        loading: false,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLogin: false,
        user: null,
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
