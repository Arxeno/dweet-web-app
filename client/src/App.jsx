import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import './App.scss';

const App = () => {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<Routes>
					<Route path="/" element={ <Home /> }/>
					<Route path="/:userName" element={ <Profile /> } />
					<Route path="/login" element={ <LogIn /> }/>
					<Route path="/signup" element={ <SignUp /> }/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;
