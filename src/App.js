// src/App.js

import React, { useState, useCallback } from "react";
import "./App.css";
import users from "./data";
import UserList from "./UserList";
import MapComponent from "./MapComponent";
import { filterUsersByBounds } from "./utils";

const App = () => {
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleBoundsChange = useCallback((bounds) => {
    const newFilteredUsers = filterUsersByBounds(users, bounds);
    setFilteredUsers(newFilteredUsers);
  }, []);

  return (
    <div className="app">
      <h1>User List and Map</h1>
      <div className="content">
        <UserList users={filteredUsers} />
        <MapComponent users={users} onBoundsChange={handleBoundsChange} />
      </div>
    </div>
  );
};

export default App;
