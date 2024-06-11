// src/MapComponent.js

import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { GoogleMap, LoadScript, Marker, MarkerF } from "@react-google-maps/api";
import { debounce } from "./utils";

const MapComponent = React.memo(({ users, onBoundsChange, distance }) => {
  const center = { lat: 37.7749, lng: -122.4194 }; // Centered at San Francisco by default
  const mapContainerStyle = {
    height: "500px",
    width: "100%",
  };

  const zoomLevelRef = useRef(5);
  const zoomLevelDisplayRef = useRef(null);

  const debouncedBoundsChange = useMemo(
    () =>
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

      map.addListener("zoom_changed", () => {
        const newZoomLevel = map.getZoom();
        if (zoomLevelRef.current !== newZoomLevel) {
          zoomLevelRef.current = newZoomLevel;
          if (zoomLevelDisplayRef.current) {
            zoomLevelDisplayRef.current.textContent = `Current Zoom Level: ${newZoomLevel}`;
          }
        }
      });
    },
    [debouncedBoundsChange]
  );
  useEffect(() => {
    if (zoomLevelDisplayRef.current) {
      zoomLevelDisplayRef.current.textContent = `Current Zoom Level: ${zoomLevelRef.current}`;
    }
  }, []);
  return (
    <>
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
      <div
        ref={zoomLevelDisplayRef}
        style={{ textAlign: "center", marginTop: "10px" }}
      >
        Current Zoom Level: {zoomLevelRef.current}
      </div>
    </>
  );
});

export default MapComponent;
