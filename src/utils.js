// src/utils.js

export const filterUsersByBounds = (users, bounds) => {
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
export const debounce = (func, delay) => {
  let inDebounce;
  return function (...args) {
    const context = this;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

