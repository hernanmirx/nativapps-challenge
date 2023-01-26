import { useState, useEffect, useContext } from 'react'
import Layout from '../components/Layout'
import ContextStates from '../context/States';
import { FaTrash } from 'react-icons/fa'
import axios from 'axios';

interface Mov {
	Title:string,
	Year:string,
	Genre:string,
	Plot:string,
	Poster:string,
	imdbID:string,
	Type:string
}


const Index = () => {
	const [ movies, setMovies ] = useState<Array<Mov>>([]);
	const [ selected, setSelected ] = useState("")
	const [ compra, setCompra ] = useState(0);
	const { cant,setCant,setOpenVista,respModal, setRespModal } = useContext(ContextStates)
  
	useEffect(() =>{
		const searchMovies=async()=>{
			let auxMovies:any = [];
			let arrayCart = JSON.parse(localStorage.getItem("arrayCart")!)
			for (let i = 0; i < arrayCart.length; i++) {
				const element = arrayCart[i];
				const url = 'http://www.omdbapi.com/?i=' + element + '&apikey=5eec5adc&plot=full';
					const result:any = await axios.get(url);
					auxMovies.push(result.data)     
			}
			setMovies(auxMovies)
		}
		searchMovies()
	},[compra,movies])

	useEffect(() => {
		const deleteMovies=async()=>{
			if (respModal)
			{
				let auxMovies:any = [];
				let arrayCart = JSON.parse(localStorage.getItem("arrayCart")!)
				for (let i = 0; i < arrayCart.length; i++) {
					const element = arrayCart[i];
					if (element!==selected)
					{
						auxMovies.push(element)     
					}
				}
				localStorage.clear()
				localStorage.setItem('arrayCart',JSON.stringify(auxMovies))
				setMovies(auxMovies)
				setRespModal(false)
			}
		}
		deleteMovies()
	},[])

	const handleClick = () => {
		localStorage.clear()
		setCompra(1)
		setCant(0)
	}
	const handleDelete = (id:any) => {
		setSelected(id)
		setOpenVista(true)
	}

	return (
		<>
			<Layout
				page={"Index"}
			/>
			<main className='w-full'>
				<div className='w-10/12 mx-auto mt-10 pt-5'>
					<h1 className='text-center text-3xl'>Carro de Compras</h1>
					<div className='w-full mt-10 flex justify-center'>
						{ cant>0 ? (
						<>
						<div className='w-1/2'>
						{ movies!==undefined && movies.map(movie=> (
							movie.Title!=="" &&
							<div key={movie.imdbID} className=''>
								<div className='w-full mx-auto flex rounded-md shadow-md hover:shadow-lg'>
								<div className='w-1/4 p-3'>
									<img className='w-full' src={movie.Poster} alt={movie.Title}/>
								</div>
								<div className='w-1/2 p-3'>
									<p className='text-xl font-bold uppercase'>{movie.Title}</p>
									<p>Año: {movie.Year}</p>
									<p className='capitalize'>Tipo: { movie.Type==="movie" ? "Película" : movie.Type }</p>
									<button 
										type="button" 
										className='flex mt-10'
										onClick={()=>handleDelete(movie.imdbID)}
									>
										<FaTrash className='mr-2 mt-1'/>Quitar
									</button>
								</div>
								</div>
							</div>
						))}
						</div>
						<div className='w-1/4 bg-slate-100 p-10'>
							<div className='mt-10 w-full mx-auto'>
								<button
									className='bg-blue-600 w-full p-3 rounded-xl text-white uppercase'
									onClick={()=>handleClick()} 
								>
									Confirmar Compra
								</button>
							</div>
						</div>
						</>
						):(
							<p className='bg-orange-200 p-5 rounded-xl text-center text-2xl'>El carro de compras está vacío</p>
						)}
					</div>
				</div>
				
			</main>
		</>
	)
}

export default Index