import React from 'react'
import { useGetAllMoviesQuery } from '../../services/redux/api/movie'
import {Link} from 'react-router-dom'
import {Button} from '@mui/material'

const AdminMovieList = () => {
  const{data:movies, isLoading} = useGetAllMoviesQuery()
  if(isLoading){
    return;
  }
  return (
    <div className='w-full flex flex-col  px-10 md:px-32 gap-20'>
      <div>
          <h1 className='text-2xl font-bold'>ALL Movie ({movies.length})</h1>
      </div>
      <div className='flex flex-wrap  items-center justify-center  gap-4'>
         {movies.map((movie) => (
            <div
              key={movie?._id}
              className="flex flex-col items-center justify-center bg-slate-950 max-w-80 p-4 rounded-md gap-2"
            >
              <div className="w-full max-w-80 h-48 overflow-hidden"> 
                 <img
                    src={`http://localhost:5005/images/${movie?.image}`}
                    alt={movie?.name}
                    className="object-cover object-center w-full h-full rounded-sm" 
                 />
              </div>
              <div className="flex flex-col items-start gap-1">
                  <h1 className='text-md font-bold'>{movie?.name}</h1>

                  <Link to='/admin/movies/create'>
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
