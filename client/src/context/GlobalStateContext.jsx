import { createContext, useState } from 'react';
import CONFIG from '../config';

const webLocalStorage = JSON.parse(
  window.localStorage.getItem(CONFIG.LOCAL_STORAGE_KEY)
);

if (webLocalStorage == null) {
  window.localStorage.setItem(CONFIG.LOCAL_STORAGE_KEY, JSON.stringify({
    isLogin: false,
    name: null
  }))
}

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {

  const [isLogin, setIsLogin] = useState(() => {
    if (webLocalStorage != null) {
      return webLocalStorage.isLogin;
    }
    return false;
  });

  const [userNameLogin, setUserNameLogin] = useState(() => {
    if (webLocalStorage != null) {
      return `@${webLocalStorage.name}`;
    }
    return null;
  });

  const [userNameLoginPhoto, setUserNameLoginPhoto] = useState(() => {
    if (webLocalStorage != null) {
      return `${CONFIG.BACKEND_URL}/photo/${webLocalStorage.name}`;
    }
    return null;
  });

  const valueToShare = {
    isLogin: {
      state: isLogin,
      setState: (bool) => {
        setIsLogin(bool);
      },
    },
    userNameLogin: {
      state: userNameLogin,
      setState: (name) => {
        setUserNameLogin(name);
      },
    },
    userNameLoginPhoto: {
      state: userNameLoginPhoto,
      setState: (photo) => {
        setUserNameLoginPhoto(photo);
      },
    },
  };

  return (
    <GlobalStateContext.Provider value={valueToShare}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateProvider };
export default GlobalStateContext;
