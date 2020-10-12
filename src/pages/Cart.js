import React, { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const [state, dispatch] = useContext(CartContext);
  return (
    <div className="container">
      <div className="card mt-3">
        <div className="card-header  bg-success text-white">
          {/*   <h2>Cart Screen | {JSON.stringify(state.user)}</h2> */}
          <h2>Cart Screen </h2>
        </div>
        <div className="card-body">
          <table className="table table-hovered table-striped table-sm table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Product Name</th>
                <th>Qty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {state.carts.map((cart, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{cart.name}</td>
                  <td>{cart.qty}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_CART",
                          payload: cart.id,
                        })
                      }
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
