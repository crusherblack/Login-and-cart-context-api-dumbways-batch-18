import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";

const CrudReactQuery = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isDone: false,
  });
  const [deleteId, setDeleteId] = useState(null);

  const { title, description, isDone } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { isLoading, error, data: todosData, refetch } = useQuery(
    "getTodos",
    () => API.get("/todos")
  );

  const [storeTodo] = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ title, description, isDone });
      const res = await API.post("/todo", body, config);

      setFormData({
        title: "",
        description: "",
        isDone: false,
      });

      return res;
    } catch (err) {
      console.log(err);
    }
  });

  const [deleteTodo] = useMutation(async () => {
    try {
      const res = await API.delete(`/todo/${deleteId}`);
      refetch();
    } catch (err) {
      console.log(err);
    }
  });

  return isLoading || !todosData ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1>error {error.message} </h1>
  ) : (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-8">
          {todosData.data.data.todos.map((todo) => (
            <h1>
              {todo.title}{" "}
              <button
                onClick={() => {
                  setDeleteId(todo.id);
                  deleteTodo();
                }}
              >
                Delete
              </button>
            </h1>
          ))}
        </div>
        <div className="col-md-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              storeTodo();
              refetch();
            }}
          >
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="title"
                value={title}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="description"
                value={description}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="isDone"
                value={isDone}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <button className="btn btn-primary btn-block">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrudReactQuery;
