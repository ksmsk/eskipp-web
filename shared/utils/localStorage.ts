export const setObject = (key: string, object: object) => {
  localStorage.setItem(key, JSON.stringify(object));
};

export const getObject = <T>(key: string): T => {
  return JSON.parse(localStorage.getItem(key));
};
