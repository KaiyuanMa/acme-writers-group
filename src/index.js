import React, { Component, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
const axios = require("axios");
import Users from "./Users";
import User from "./User";
import CreateUser from "./CreateUser";
import CreateStory from "./CreateStory";
import { fetchStories, fetchUsers, deleteUser } from "./api";

function App() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const load = async () => {
      const response = await fetchUsers();
      setUsers(response.data);
      const userId = window.location.hash.slice(1);
      setUserId(userId);
      window.addEventListener("hashchange", () => {
        const userId = window.location.hash.slice(1);
        setUserId(userId);
      });
    };
    load();
  }, []);

  const deleteAUser = async (user) => {
    await deleteUser(user);
    window.location = "/";
  };

  const createAStory = async (user) => {
    const story = await createStory(user.id);
    const stories = [...this.state.stories, story];
    this.setState({ stories });
  };
  return (
    <div>
      <h1>Acme Writers Group ({users.length})</h1>
      <main>
        <Users users={users} userId={userId} deleteUser={deleteAUser} />
        {userId ? <User userId={userId} /> : null}
      </main>
    </div>
  );
}

const root = document.querySelector("#root");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/createUser" element={<CreateUser />} />
      <Route path="/createStory" element={<CreateStory />} />
    </Routes>
  </BrowserRouter>,
  root
);
