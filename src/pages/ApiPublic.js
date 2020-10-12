import React, { useEffect, useState } from "react";
import axios from "axios";

const ApiPublic = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //promise then
    const loadJsonPlaceholderV1 = () => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          setPosts(json);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    //async await
    const loadJsonPlaceholderV2 = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos/1"
        );
        return response.json();
      } catch (err) {
        console.log(err);
      }
    };

    loadJsonPlaceholderV1();
    loadJsonPlaceholderV2().then((data) => console.log(data));
  }, []);

  return (
    <div className="container-fluid">
      <table className="table table-sm table-striped table-hovered table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {loading || !posts ? (
            <tr>
              <td colSpan="3">Loading...</td>
            </tr>
          ) : (
            posts.map((post, index) => (
              <tr key={post.id}>
                <td>{index + 1}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApiPublic;
