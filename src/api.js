const axios = require("axios");

const fetchUsers = () => {
  return axios.get("/api/users");
};

const fetchUserWithStory = (UserId) => {
  return axios.get(`/api/users/${UserId}`);
};

const addUser = (user) => {
  const response = axios.post("/api/users", user);
  return response.data;
};

const deleteUser = (user) => {
  return axios.delete(`/api/users/${user.id}`);
};

const fetchStories = (UserId) => {
  return axios.get(`/api/users/${UserId}/stories`);
};

const addStory = (user, story) => {
  const response = axios.post(`/api/users/${user.id}/stories`, story);
  return response.data;
};

const updateStory = (story, params) => {
  return axios.put(`/api/users/${story.UserId}/stories/${story.id}`, params);
};

const deleteStory = (story) => {
  return axios.delete(`/api/users/${story.UserId}/stories/${story.id}`);
};

export {
  fetchUsers,
  fetchUserWithStory,
  addUser,
  deleteUser,
  fetchStories,
  addStory,
  deleteStory,
  updateStory,
};
