import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login'
import './App.scss';

const App = () => {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<Routes>
					<Route path="/" element={ <Home /> }/>
					<Route path="/:userName" element={ <Profile /> } />
					<Route path="/login" element={ <Login /> }/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;
