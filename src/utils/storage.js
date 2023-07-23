const AUTH_LOCAL_STORAGE_KEY = "swm-auth";
const USER_LOCAL_STORAGE_KEY = "swm-user";

export const setItem = (key, val) => {
  window.localStorage.setItem(key, val);
};

export const getItem = (item) => {
  return window.localStorage.getItem(item);
};

export const removeItem = (...items) => {
  items.map((item) => window.localStorage.removeItem(item));
};

export const clearStorage = () => window.localStorage.clear();

export const getAuth = () => {
  try {
    const authString = getItem(AUTH_LOCAL_STORAGE_KEY);
    const auth = authString ? JSON.parse(authString) : undefined;
    if (!auth) {
      return;
    }

    let dateExpireSeconds = new Date(auth.expires_at || 0);
    const expires_at = Math.floor(dateExpireSeconds.getTime() / 1000);
    if (expires_at < Math.floor(Date.now() / 1000)) {
      removeAuth();
      return;
    }

    return auth;
  } catch (error) {
    console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
  }
};

export const setAuth = (auth) => {
  try {
    const authString = JSON.stringify(auth);
    setItem(AUTH_LOCAL_STORAGE_KEY, authString);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE SAVE ERROR", error);
  }
};

export const removeAuth = () => {
  removeItem(AUTH_LOCAL_STORAGE_KEY);
};

export const getUser = () => {
  try {
    const userString = getItem(USER_LOCAL_STORAGE_KEY);
    const user = userString ? JSON.parse(userString) : undefined;
    if (!user) {
      return;
    }

    return user;
  } catch (error) {
    console.error("USER LOCAL STORAGE PARSE ERROR", error);
  }
};

export const setUser = (user) => {
  try {
    const userString = JSON.stringify(user);
    setItem(USER_LOCAL_STORAGE_KEY, userString);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE SAVE ERROR", error);
  }
};
