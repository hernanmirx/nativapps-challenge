import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ContextStates from './context/States';
import Index from './pages/Index';
import Cart from './pages/Cart';
import Movie from './pages/Movie';
import ModalVista from './components/Modal';

function App() {
	const [ cant, setCant ] = useState(0)
	const [ openVista, setOpenVista ] = useState(false)
	const [ respModal, setRespModal ] = useState(false)
	return (
		<ContextStates.Provider
			value={{cant, setCant,openVista, setOpenVista,respModal, setRespModal}}
		>
			<BrowserRouter>
			<Routes>
				<Route path='/movie/:id' element={<Movie />} />
				<Route path='/' element={<Index />} />
				<Route path='/cart' element={<Cart />} />
			</Routes>
			<ModalVista/>
			</BrowserRouter>
		</ContextStates.Provider>
	);
}

export default App;
