import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import {
  fetchUserWithStory,
  fetchStories,
  deleteStory,
  addStory,
  updateStory,
} from "./api";
import { useNavigate } from "react-router-dom";

const User = ({ userId }) => {
  const [user, setUser] = useState({});
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const load = async () => {
      const userResponse = await fetchUserWithStory(userId);
      setUser(userResponse.data);
      const storiesResponse = await fetchStories(userId);
      setStories(storiesResponse.data);
    };
    load();
  }, [userId]);

  const deleteAStory = async (story) => {
    await deleteStory(story);
    const storiesResponse = await fetchStories(userId);
    setStories(storiesResponse.data);
  };

  const updateFavorite = async (story) => {
    const name = story.favorite
      ? "story-like-btn dislike-btn"
      : "story-like-btn like-btn";
    document.getElementById(story.id).className = `${name}`;
    console.log(story);
    await updateStory(story, { favorite: !story.favorite });
    const storiesResponse = await fetchStories(userId);
    setStories(storiesResponse.data);
  };
  const navigate = useNavigate();
  function handelClick() {
    navigate("/createStory", { state: { userId: userId } });
  }
  return (
    <div>
      <div className="user-detail-head">
        <div>
          <p className="bio-title">{user.name}</p>
          <p>{user.bio}</p>
        </div>
        <button className="new-story-btn" onClick={handelClick}>
          New Story
        </button>
      </div>
      <ul>
        {stories.map((story) => {
          return (
            <li key={story.id} className="userStory">
              <div className="storyHead">
                <h2 className="userStoryTitle">{story.title}</h2>
                <button
                  className="delete-btn story-delete-btn"
                  onClick={() => deleteAStory(story)}
                >
                  Delete
                </button>
                <button
                  className={`story-like-btn ${
                    story.favorite ? "like-btn" : "dislike-btn"
                  }`}
                  id={story.id}
                  onClick={() => {
                    updateFavorite(story);
                  }}
                >
                  Favorite
                </button>
              </div>
              <p>{story.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default User;
