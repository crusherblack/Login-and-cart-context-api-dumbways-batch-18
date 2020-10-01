import React, { useContext } from "react";
import { CartContext } from "../context/cartContext";

const Home = () => {
  const [state, dispatch] = useContext(CartContext);

  const products = [
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
    {
      id: 4,
      name: "Nintendo Switch Lite",
    },
    {
      id: 5,
      name: "PS5 ",
    },
    {
      id: 6,
      name: "Laptop ROG",
    },
    {
      id: 7,
      name: "Mouse ",
    },
  ];

  return (
    <div className="container">
      <div className="card mt-3">
        <div className="card-header  bg-primary text-white">
          <h2>Home Screen</h2>
        </div>
        <div className="card-body">
          <div className="row">
            {products.map((product) => (
              <div className="col-md-3">
                <div className="card mt-3">
                  <div
                    className="card-body"
                    style={{
                      height: "150px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <h1>{product.name}</h1>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={() =>
                        dispatch({
                          type: "ADD_CART",
                          payload: {
                            id: product.id,
                            name: product.name,
                          },
                        })
                      }
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
