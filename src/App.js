import React from 'react';
import Home from './Pages/Home';
import Room from './Pages/Room';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/:room_id" element={<Room />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
