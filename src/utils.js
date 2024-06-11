// src/utils.js

export const filterUsersByBounds = (users, bounds, distance) => {
  if (distance > 0) {
    return filterUsersByDistance(users, bounds, distance);
  }
  return users.filter((user) => {
    const { lat, lng } = user.coordinates;
    return (
      lat >= bounds.getSouthWest().lat() &&
      lat <= bounds.getNorthEast().lat() &&
      lng >= bounds.getSouthWest().lng() &&
      lng <= bounds.getNorthEast().lng()
    );
  });
};

export const sortUsersByDistance = (users, center) => {
  console.log(users)
  console.log(center)
  return users.sort((a, b) => {
    const { lat: lat1, lng: lng1 } = a.coordinates;
    const { lat: lat2, lng: lng2 } = b.coordinates;
    const distance1 = calculateDistance(center.lat, center.lng, lat1, lng1);
    const distance2 = calculateDistance(center.lat, center.lng, lat2, lng2);
    return distance1 - distance2;
  }); 
};

export const filterUsersByDistance = (users, bounds, radius) => {
  // console.log(bounds);
  const center = bounds.getCenter();
  return users.filter((user) => {
    const { lat, lng } = user.coordinates;
    const distance = calculateDistance(center.lat(), center.lng(), lat, lng);
    return distance <= radius;
  });
};

export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  const distanceInMiles = Math.floor(distance / 1.609);
  return distanceInMiles;
}

export function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
export const debounce = (func, delay) => {
  let inDebounce;
  return function (...args) {
    const context = this;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};
