import React from "react";
import { useNavigate } from "react-router-dom";

const Users = ({ users, userId, deleteUser }) => {
  const navigate = useNavigate();
  function handelClick() {
    navigate("/createUser");
  }
  return (
    <div>
      <button className="new-user-btn" onClick={handelClick}>
        New User
      </button>
      <ul className="userList">
        {users.map((user) => {
          return (
            <div className="userContainer">
              <button
                className={`userListItem ${
                  user.id === userId * 1 ? "selected" : ""
                }`}
                key={user.id}
                onClick={() => {
                  location.hash = user.id;
                }}
              >
                {user.name}
              </button>
              <button
                className="userDeleteBtn"
                onClick={() => deleteUser(user)}
              >
                X
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
