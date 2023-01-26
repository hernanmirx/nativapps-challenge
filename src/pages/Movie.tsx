import { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom'
import ContextStates from '../context/States';
import axios from 'axios';
import Message from '../components/Message';

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
	const { cantCart,setCantCart,setMessage } = useContext(ContextStates)

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
            let arrayCart = [{id:m.id,cant:1}]
            localStorage.setItem('arrayCart',JSON.stringify(arrayCart))
            setCantCart(1)
        }
        else
        {
            let arrayCart = JSON.parse(localStorage.getItem("arrayCart")!)
            let cantAux=1;
            for (let i = 0; i < arrayCart.length; i++) {
                const element = arrayCart[i];
                if (element.id===m.id)
                {
                    cantAux=element.cant+1;
                    arrayCart[i]={id:element.id,cant:cantAux}
                }
            }
            if (cantAux===1)
            {
                arrayCart.push({id:m.id,cant:cantAux})
                let auxCantCart=cantCart+1;
                setCantCart(auxCantCart)        
            }
            localStorage.setItem('arrayCart',JSON.stringify(arrayCart))
        }
        setMessage("Película agregada al carro de compras");
		setTimeout(() => {
            setMessage("");
		}, 3000)

    }

  return (
   		<>
			<Layout
				page={"Película"}
			/>
            <main className='w-full'>
                <Message/>
				<div className='w-10/12 mx-auto mt-10 pt-5'>
					<h1 className='text-center text-3xl'></h1>
					<div className='w-full mt-10'>
						{ movie!==undefined &&
							<div key={movie.imdbID} className='w-1/2 mx-auto rounded-md shadow-md mb-10'>
                                <div key={movie.imdbID} className='w-full mx-auto flex'>
                                    <div className='w-1/2 p-3'>
                                        <img className='w-full' src={movie.Poster} alt={movie.Title}/>
                                    </div>
                                    <div className='w-1/2 p-3'>
                                        <p className='text-xl font-bold uppercase'>{movie.Title}</p>
                                        <p>Año: {movie.Year}</p>
                                        <p>Género: {movie.Genre}</p>
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
                                <div className='w-full flex-col p-3 text-justify'>
                                    <p>Sinópsis: {movie.Plot}</p>
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