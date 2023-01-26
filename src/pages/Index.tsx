import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Mov {
	Title:string,
	Year:string,
	Genre:string,
	Plot:string,
	Poster:string,
	imdbID:string,
	Type:string
}

const INITIAL_STATE = [
	{
	Title:"",
	Year:"",
	Genre:"",
	Plot:"",
	Poster:"",
	imdbID:"",
	Type:""
	}
]

const Index = () => {
	const [ titleSearch, setTitleSearch ] = useState("");
	const [ movies, setMovies ] = useState<Array<Mov>>([]);

	useEffect(() =>{
		const searchMovies=async()=>{
			const url = 'http://www.omdbapi.com/?s=' + titleSearch + '&apikey=5eec5adc&plot=full';
			const result = await axios.get(url);
			if (result.data.Error===undefined)
			{
				setMovies(result.data.Search)
				console.log(movies[0])
			}
			else{
				setMovies(INITIAL_STATE)
			}
		}
		searchMovies()
	},[titleSearch])

	return (
		<>
			<Layout
				page={"Index"}
			/>
			<main className='w-full'>
				<div className='w-10/12 mx-auto mt-10 pt-5'>
					<h1 className='text-center text-3xl'>Búsqueda de Peliculas</h1>
					<div className='w-1/2 mt-5 mx-auto'>
						<label className='mr-10' htmlFor='nameMovie'>Título</label>
						<input 
							type="text" 
							className='bg-slate-100 p-3 rounded-md w-full' 
							id="nameMovie" 
							placeholder='Título de la pelĺicula'
							value={titleSearch}
							onChange={(e)=>setTitleSearch(e.target.value)}
						/>
					</div>
					<div className='w-full mt-10'>
						{ movies!==undefined && movies.map(movie=> (
							movie.Title!=="" &&
							<Link
								to={`/movie/${movie.imdbID}`}
							>
							<div key={movie.imdbID} className='w-1/2 mx-auto flex mb-10 rounded-md shadow-md hover:shadow-lg'>
								<div className='w-1/4 p-3'>
									<img className='w-full' src={movie.Poster} alt={movie.Title}/>
								</div>
								<div className='w-1/2 p-3'>
									<p className='text-xl font-bold uppercase'>{movie.Title}</p>
									<p>Año: {movie.Year}</p>
									<p className='capitalize'>Tipo: { movie.Type==="movie" ? "Película" : movie.Type }</p>
								</div>
							</div>
							</Link>
						))}

					</div>
				</div>
				
			</main>
		</>
	)
}

export default Index