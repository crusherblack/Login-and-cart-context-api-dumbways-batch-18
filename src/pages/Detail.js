import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../fakeData/product";

const Detail = () => {
  const { id } = useParams();

  const product = products.filter((item) => item.id == id);

  return (
    <div>
      <h1>ini adalah details: {id}</h1>
      <h1>Nama Product: {product[0].name}</h1>
    </div>
  );
};

export default Detail;
