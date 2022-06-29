import React from "react";

const Users = ({ users, userId, deleteUser }) => {
  return (
    <div>
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
