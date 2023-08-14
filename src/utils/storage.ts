// SET FROM STORAGE
const setAccessToken = (token: string) => localStorage.setItem("token", token);
const setUIMode = (mode: string) => {
  localStorage.setItem("uiMode", mode);
};

// GET FROM STORAGE
const getAccessToken = () => localStorage.getItem("token");
const getUIMode = () => localStorage.getItem("uiMode");

// Remove items from storage
const removeItemFromStorage = (key: any) => localStorage.removeItem(key);

export {
  removeItemFromStorage,
  setAccessToken,
  getAccessToken,
  setUIMode,
  getUIMode,
};
