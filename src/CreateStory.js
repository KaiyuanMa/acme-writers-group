import React, { Component, useEffect, useState } from "react";
import { addStory } from "./api";
import { useLocation, useNavigate } from "react-router-dom";

const CreateStory = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const location = useLocation();

  useEffect(() => {
    setUserId(location.userId);
  });

  const navigate = useNavigate();
  const homepage = () => navigate("/");
  const handelSubmit = async (e) => {
    await addStory(userId, { title: title, body: body });
    navigate("/");
  };

  return (
    <div className="form-container">
      <button className="home-btn" onClick={homepage}>
        Home
      </button>
      <p>{userId}</p>
      <div className="create-user-form">
        <h1>Create Story</h1>
        <form
          onSubmit={() => {
            handelSubmit;
          }}
        >
          <label>Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Body</label>
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <button className="create-btn">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateStory;
