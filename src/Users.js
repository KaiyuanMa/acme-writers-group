import React from "react";

const Users = ({ users, userId, deleteUser }) => {
  return (
    <ul className="userList">
      {users.map((user) => {
        return (
          <li
            className={`userListItem ${
              user.id === userId * 1 ? "selected" : ""
            }`}
            key={user.id}
          >
            <a href={`#${user.id}`}>{user.name}</a>
            <button className="userDeleteBtn" onClick={() => deleteUser(user)}>
              X
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Users;
