export function deepCopy(obj) {
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
