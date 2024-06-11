// src/App.js

import React, { useState, useCallback, useRef, useEffect } from "react";
import "./App.css";
import users from "./data";
import UserList from "./UserList";
import MapComponent from "./MapComponent";
import { filterUsersByBounds, sortUsersByDistance } from "./utils";

const App = () => {
  const [filteredUsers, setFilteredUsers] = useState(users);

  const distance = useRef(100);

  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [bounds, setBounds] = useState(null);

  const handleBoundsChange = useCallback((bounds) => {
    // console.log("CENTER::", bounds.getCenter());
    const cen = bounds.getCenter();
    setCenter({ lat: cen.lat(), lng: cen.lng() });
    setBounds(bounds);
    const newFilteredUsers = filterUsersByBounds(users, bounds, 100);
    setFilteredUsers(
      sortUsersByDistance(newFilteredUsers, { lat: cen.lat(), lng: cen.lng() })
    );
  }, []);

  // useEffect(() => {
  //   const newFilteredUsers = sortUsersByDistance(users, center);
  //   console.log("newFilteredUsers::", newFilteredUsers);
  //   setFilteredUsers(newFilteredUsers);
  // }, [center]);
  distance.current = 100;
  return (
    <div className="app">
      <h1>User List and Map</h1>
      <input
        type="number"
        placeholder="Enter distance in miles"
        ref={distance}
        disabled={true}
        value={distance.current}
        onChange={(e) => {
          console.log("Bounds::", bounds);
          console.log("Center::", center);
          const newFilteredUsers = filterUsersByBounds(
            users,
            bounds,
            e.target.value
          );
          setFilteredUsers(
            sortUsersByDistance(newFilteredUsers, {
              lat: center.lat,
              lng: center.lng,
            })
          );
        }}
      />
      <div className="content">
        <UserList users={filteredUsers} center={center} />
        <MapComponent
          users={users}
          onBoundsChange={handleBoundsChange}
          distance={distance}
        />
      </div>
    </div>
  );
};

export default App;
