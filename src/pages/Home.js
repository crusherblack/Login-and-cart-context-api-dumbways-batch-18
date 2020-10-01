import React, { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { products } from "../fakeData/product";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const [state, dispatch] = useContext(CartContext);

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
                      cursor: "pointer",
                    }}
                    onClick={() => history.push(`/detail/${product.id}`)}
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
