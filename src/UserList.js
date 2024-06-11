// src/UserList.js

import React from "react";
import { calculateDistance } from "./utils";

const UserList = ({ users, center }) => {
  // console.log("Center: ", center);
  return (
    <div className="user-list">
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h3>
              {user.name} -{" "}
              {calculateDistance(
                center.lat,
                center.lng,
                user.coordinates.lat,
                user.coordinates.lng
              )}{" "}
              miles
            </h3>
            <p>{user.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
