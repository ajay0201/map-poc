// src/data.js

// Get users data from data.json and extract name, id, address, coordinates
const users = require("./data.json").map((user) => {
  return {
    id: user.id,
    name: user.FullName,
    address:
      user.AddressLine1 +
      ", " +
      user.City +
      ", " +
      user.State +
      " " +
      user.ZipCode,
    coordinates: {
      lat: parseFloat(user.Latitude),
      lng: parseFloat(user.Longitude),
    },
  };
});
// const users = [
//   {
//     id: 1,
//     name: "John Doe",
//     address: "123 Main St, Anytown, USA",
//     coordinates: { lat: 37.7749, lng: -122.4194 }, // San Francisco, CA
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     address: "456 Elm St, Othertown, USA",
//     coordinates: { lat: 34.0522, lng: -118.2437 }, // Los Angeles, CA
//   },
//   // Add more users as needed
// ];

export default users;
