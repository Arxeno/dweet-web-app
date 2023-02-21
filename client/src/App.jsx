import { React, useState, useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import './App.scss';
import GlobalStateContext from './context/GlobalStateContext';
import { useSelector } from 'react-redux';

const App = () => {
  const isLogin = useContext(GlobalStateContext).isLogin;
  // if (userNameState == '') {
  // 	window.location.href = '/login'
  // }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/home"
            element={isLogin.state ? <Home /> : <Navigate to="/" />}
          />
          <Route path="/" element={<LogIn />} />
          <Route
            path="/:userName"
            element={isLogin.state ? <Profile /> : <Navigate to="/" />}
          />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
