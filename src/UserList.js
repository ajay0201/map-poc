// src/UserList.js

import React from "react";

const UserList = ({ users }) => {
  return (
    <div className="user-list">
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
