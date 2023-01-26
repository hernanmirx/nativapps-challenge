import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ContextStates from './context/States';
import Index from './pages/Index';
import Cart from './pages/Cart';
import Movie from './pages/Movie';
import ModalVista from './components/Modal';

function App() {
	const [ cantCart, setCantCart ] = useState(0)
	const [ openVista, setOpenVista ] = useState(false)
	const [ respModal, setRespModal ] = useState(false)
	const [ message, setMessage ] = useState("")
	const [ selectedMovie, setSelectedMovie ] = useState("")
	return (
		<ContextStates.Provider
			value={{cantCart, setCantCart,openVista, setOpenVista,respModal, setRespModal,selectedMovie, setSelectedMovie,message, setMessage}}
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
