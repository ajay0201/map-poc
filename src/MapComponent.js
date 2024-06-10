// src/MapComponent.js

import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, LoadScript, Marker, MarkerF } from "@react-google-maps/api";
import { debounce } from "./utils";

const MapComponent = React.memo(({ users, onBoundsChange }) => {
  const center = { lat: 37.7749, lng: -122.4194 }; // Centered at San Francisco by default

  const mapContainerStyle = {
    height: "500px",
    width: "100%",
  };

  const debouncedBoundsChange = useCallback(
    debounce((map) => {
      const bounds = map.getBounds();
      onBoundsChange(bounds);
    }, 300),
    [onBoundsChange]
  );

  const onLoad = useCallback(
    function callback(map) {
      map.addListener("bounds_changed", () => {
        debouncedBoundsChange(map);
      });
    },
    [debouncedBoundsChange]
  );


  return (
    <LoadScript googleMapsApiKey="AIzaSyBAptbiGrC--a58QLkP5JH_cmXypUAVOjc">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={5}
        onLoad={onLoad}
      >
        {users.map((user) => (
          <MarkerF key={user.id} position={user.coordinates} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
});

export default MapComponent;
