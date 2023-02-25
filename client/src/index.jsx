import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStateProvider } from './context/GlobalStateContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalStateProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GlobalStateProvider>
);
