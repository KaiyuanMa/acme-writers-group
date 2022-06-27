import React, { Component } from "react";
import axios from "axios";

const User = ({ user, stories, deleteStory }) => {
  // constructor() {
  //   super();
  //   this.state = {
  //     user: {},
  //     stories: [],
  //   };
  //   this.deleteStory = this.deleteStory.bind(this);
  // }
  // async componentDidMount() {
  //   let response = await axios.get(`/api/users/${this.props.userId}`);
  //   this.setState({ user: response.data });
  //   response = await axios.get(`/api/users/${this.props.userId}/stories`);
  //   this.setState({ stories: response.data });
  // }
  // async componentDidUpdate(prevProps) {
  //   if (prevProps.userId !== this.props.userId) {
  //     let response = await axios.get(`/api/users/${this.props.userId}`);
  //     this.setState({ user: response.data });
  //     response = await axios.get(`/api/users/${this.props.userId}/stories`);
  //     this.setState({ stories: response.data });
  //   }
  // }

  return (
    <div>
      Details for {user.name}
      <p>{user.bio}</p>
      <ul>
        {stories.map((story) => {
          return (
            <li key={story.id} className="userStory">
              <div className="storyHead">
                <h2 className="userStoryTitle">{story.title}</h2>
                <button
                  className="delete-btn"
                  onClick={() => deleteStory(story)}
                >
                  delete
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
