import { createContext, useState } from 'react';

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userNameLogin, setUserNameLogin] = useState(null);
  const [userNameLoginPhoto, setUserNameLoginPhoto] = useState(null);

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
