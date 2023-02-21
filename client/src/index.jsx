import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStateProvider } from './context/GlobalStateContext';
// import IsLoginContext, {IsLoginProvider} from './context/IsLoginContext'
// import UserNameContext, {UserNameProvider} from './context/UserNameContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalStateProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GlobalStateProvider>
);
