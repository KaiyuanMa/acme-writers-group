import React, { Component } from "react";
import { render } from "react-dom";
import axios from "axios";
import Users from "./Users";
import User from "./User";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      userId: "",
      currentUser: {},
      stories: [],
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.deleteStory = this.deleteStory.bind(this);
  }
  async componentDidMount() {
    try {
      const userId = window.location.hash.slice(1);
      this.setState({ userId });
      const response = await axios.get("/api/users");
      this.setState({ users: response.data });
      window.addEventListener("hashchange", async () => {
        const userId = window.location.hash.slice(1);
        this.setState({ userId });
        const stories = await axios.get(`/api/users/${userId}/stories`);
        this.setState({ stories: stories.data });
        const currentUser = await axios.get(`/api/users/${userId}`);
        this.setState({ currentUser: currentUser.data });
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  async deleteUser(user) {
    await axios.delete(`/api/users/${user.id}`);
    const users = this.state.users.filter((_user) => _user.id !== user.id);
    this.setState({ users });
    this.setState({ userId: "" });
  }

  async deleteStory(story) {
    const storyId = story.id;
    await axios.delete(`/api/users/${story.userId}/stories/${story.id}`);
    const stories = this.state.stories.filter(
      (_story) => _story.id !== storyId
    );
    this.setState({ stories });
  }

  render() {
    const { users, userId, stories, currentUser } = this.state;
    return (
      <div>
        <h1>Acme Writers Group ({users.length})</h1>
        <main>
          <Users users={users} userId={userId} deleteUser={this.deleteUser} />
          {userId ? (
            <User
              user={currentUser}
              stories={stories}
              deleteStory={this.deleteStory}
            />
          ) : null}
        </main>
      </div>
    );
  }
}

const root = document.querySelector("#root");
render(<App />, root);
