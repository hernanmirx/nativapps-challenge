import { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom'
import ContextStates from '../context/States';
import axios from 'axios';

interface Mov {
	Title:string,
	Year:string,
	Genre:string,
	Plot:string,
	Poster:string,
	Type:string,
    imdbID:string
}

function Movie() {
	const [ movie, setMovie ] = useState<Mov>({
        Title:"",
        Year:"",
        Genre:"",
        Plot:"",
        Poster:"",
        Type:"",
        imdbID:""
    })
	const { cant,setCant } = useContext(ContextStates)

    useEffect(() => {
        const getMovie = async () => {
            const url = 'http://www.omdbapi.com/?i=' + m.id + '&apikey=5eec5adc&plot=full';
            const result = await axios.get(url);
            setMovie(result.data);
        }
        getMovie();
    }, [])
    
    let m=useParams()

    const handleClick = () => {
        if (localStorage.getItem("arrayCart") === null)
        {
            let arrayCart = [m.id]
            localStorage.setItem('arrayCart',JSON.stringify(arrayCart))
        }
        else
        {
            let arrayCart = JSON.parse(localStorage.getItem("arrayCart")!)
            arrayCart.push(m.id)
            localStorage.setItem('arrayCart',JSON.stringify(arrayCart))
        }
        let auxCant=cant+1;
        setCant(auxCant)
    }

  return (
   		<>
			<Layout
				page={"Index"}
			/>
            <main className='w-full'>
				<div className='w-10/12 mx-auto mt-10 pt-5'>
					<h1 className='text-center text-3xl'></h1>
					<div className='w-full mt-10'>
						{ movie!==undefined &&
							<div key={movie.imdbID} className='w-1/2 mx-auto flex mb-10 rounded-md shadow-md'>
								<div className='w-1/2 p-3'>
									<img className='w-full' src={movie.Poster} alt={movie.Title}/>
								</div>
								<div className='w-1/2 p-3'>
									<p className='text-xl font-bold uppercase'>{movie.Title}</p>
									<p>Año: {movie.Year}</p>
									<p className='capitalize'>Tipo: { movie.Type==="movie" ? "Película" : movie.Type }</p>
                                    <div className='mt-10 w-full mx-auto'>
                                        <button
                                            className='bg-blue-600 w-full p-3 rounded-xl text-white uppercase'
                                            onClick={()=>handleClick()} 
                                        >
                                            Agregar al carro
                                        </button>
                                    </div>
								</div>
                            </div>

                            }

					</div>
				</div>
				
			</main>
        </>
  )
}

export default Movie