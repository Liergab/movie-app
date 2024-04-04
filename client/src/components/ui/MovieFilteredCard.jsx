import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
const MovieFilteredCard = ({movies}) => {

  return (
    <section className='flex flex-wrap h-60 items-center justify-center gap-4 mt-28'>
        {movies?.map((movie) => (
            <div key={movie?._id} className="flex flex-col items-center justify-center bg-slate-950 max-w-80 p-4 rounded-md gap-2 cursor-pointer hover:ring-2 ring-sky-800 ring-offset-4 ring-offset-slate-800 dark:ring-offset-slate-900">
                <div className="w-full max-w-80 h-48 overflow-hidden">
                    <img src={`http://localhost:5005/images/${movie?.image}`} alt={movie?.name} className="object-cover object-center w-full h-full rounded-sm" />
                </div>
                <div className="flex flex-col items-start gap-1">
                    <h1 className='text-md font-bold'>{movie?.name}</h1>
                    <Link to={`/movies/${movie?._id}`}>
                        <p className='text-xs'>
                        {movie?.detail.length > 35 ? `${movie?.detail.slice(0, 35)}... ` : movie?.detail}
                        {movie?.detail.length > 40 && (
                            <button className="text-blue-500 hover:text-blue-700"> See More </button>
                        )}
                        </p>
                    </Link>
                    <p className='text-xs'>Cast: {movie?.cast}</p>
                    <p className='text-xs'>Year: {movie?.year}</p>
                </div>
            </div>
        ))}
  </section>
  )
}

export default MovieFilteredCard
