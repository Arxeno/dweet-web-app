import { createContext, useState } from 'react';
import CONFIG from '../config';

const webLocalStorage = JSON.parse(
  window.localStorage.getItem(CONFIG.LOCAL_STORAGE_KEY)
);

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(webLocalStorage.isLogin || false);
  const [userNameLogin, setUserNameLogin] = useState(
    `@${webLocalStorage.name}` || null
  );
  const [userNameLoginPhoto, setUserNameLoginPhoto] = useState(() => {
    if (webLocalStorage.name) {
      return `${CONFIG.BACKEND_URL}/photo/${webLocalStorage.name}`;
    }
    return null
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
