import React      from 'react'
import {Link}     from 'react-router-dom'
import {Button}   from '@mui/material'
import { useGetAllMoviesQuery } from '../../services/redux/api/movie'

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const AdminMovieList = () => {
  const{data:movies, isLoading} = useGetAllMoviesQuery()
  if(isLoading){
    return;
  }
  return (
    <div className='w-full flex flex-col  px-4 md:px-32 gap-20 mt-20'>
      <div>
          <h1 className='text-2xl font-bold'>ALL Movie ({movies.length})</h1>
      </div>
      <div className='flex flex-wrap  items-center justify-center gap-4 '>
         {movies.map((movie) => (
            <div
              key={movie?._id}
              className="flex flex-col items-center justify-center bg-slate-950 max-w-80 p-4 rounded-md gap-2 cursor-pointer hover:ring-2 ring-sky-800 ring-offset-4 ring-offset-slate-800 dark:ring-offset-slate-900"
            >
              <div className="w-full max-w-80 h-48 overflow-hidden"> 
                 <img
                    src={`${BASE_URL}/images/${movie?.image}`}
                    alt={movie?.name}
                    className="object-cover object-center w-full h-full rounded-sm" 
                 />
              </div>
              <div className="flex flex-col items-start gap-1">
                  <h1 className='text-md font-bold'>{movie?.name}</h1>

                  <Link to={`/movies/${movie?._id}`}>
                      <p className='text-xs'>
                        {movie?.detail.length > 35
                          ? `${movie?.detail.slice(0, 35)}... `
                          : movie?.detail}
                        {movie?.detail.length > 40 && (
                          <button className="text-blue-500 hover:text-blue-700">
                            See More
                          </button>
                        )}
                      </p>
                  </Link>

                  <p className='text-xs'>Year: {movie?.year}</p>
                  <Link to={`/admin/movies/update/${movie?._id}`}>
                    <Button variant='outlined' fullWidth>Update</Button>
                  </Link>
              </div>
            </div>
          ))}
      </div>
      <h1>{movies.length === 0 && " No movie"}</h1>
    </div>
  )
}

export default AdminMovieList
