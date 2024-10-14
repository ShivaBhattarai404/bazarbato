// helper functions
// These function are pure function so they can be used in both client and server side
export function deepCopy(obj) {
  if (!obj) return null;
  return JSON.parse(JSON.stringify(obj));
}

export function convertMinutesToMilliseconds(minutes) {
  return minutes * 60 * 1000;
}

export const formatDate = (date) => {
  return new Date(date).toLocaleString("en-us", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export function capitalize(str = "") {
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}
