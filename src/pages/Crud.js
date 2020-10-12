import React, { useState, useEffect } from "react";
import { API } from "../config/api";

const Crud = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isDone: false,
  });

  const { title, description, isDone } = formData;

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        const res = await API.get("/todos");
        setTodos(res.data.data.todos);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };

    loadTodos();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStore = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ title, description, isDone });
      const res = await API.post("/todo", body, config);

      setTodos([...todos, res.data.data.todo]);
      setFormData({
        title: "",
        description: "",
        isDone: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await API.delete(`/todo/${id}`);

      const filteredTodosNotDeleted = todos.filter((todo) => todo.id != id);
      setTodos(filteredTodosNotDeleted);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="font-weight-bold mb-3">Todos List</h2>
              <table className="table table-sm table-striped table-hovered table-bordered">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading || !todos ? (
                    <tr>
                      <td colSpan="3">Loading...</td>
                    </tr>
                  ) : (
                    todos.map((todo, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{todo.title}</td>
                        <td>{todo.description}</td>
                        <td>{todo.isDone ? "Done" : "On Progress"}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(todo.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="font-weight-bold  mb-3">Create Todo</h2>
              <form onSubmit={(e) => handleStore(e)}>
                <div className="form-group">
                  <label>Todo Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What do you want to do?"
                    value={title}
                    onChange={(e) => handleChange(e)}
                    name="title"
                  />
                  <small>Please input related todo</small>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={description}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                  <small>Please input related description</small>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="isDone"
                    value={isDone}
                    onChange={(e) => handleChange(e)}
                    className="form-control"
                  >
                    <option value={false}>On Progress</option>
                    <option value={true}>Done</option>
                  </select>
                  <small>Please select your todo status</small>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Save Todo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crud;
