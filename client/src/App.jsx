import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import './App.scss';

const App = () => {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<Routes>
					<Route path="/" element={ <Home /> }/>
					<Route path="/:userId" element={ <Profile /> } />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
