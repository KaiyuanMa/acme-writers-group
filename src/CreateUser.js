import React, { Component, useEffect, useState } from "react";
import { addUser } from "./api";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const navigate = useNavigate();
  const homepage = () => navigate("/");
  const handelSubmit = async (e) => {
    e.preventDefault();
    await addUser({ name: name, bio: bio });
    navigate("/");
  };

  return (
    <div className="form-container">
      <button className="home-btn" onClick={homepage}>
        Home
      </button>
      <div className="create-user-form">
        <h1>Create User</h1>
        <form onSubmit={handelSubmit}>
          <label>User Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>User Biography</label>
          <textarea
            required
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
          <button className="create-btn">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
