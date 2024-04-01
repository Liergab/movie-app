import React from 'react'
import { useGetAllMoviesQuery } from '../../services/redux/api/movie'

const AdminMovieList = () => {
  const{data, isLoading} = useGetAllMoviesQuery()
  if(isLoading){
    return;
  }
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      {data.map((d) =>(
        <div className='w-full max-w-96 h-96 flex flex-col items-center justify-center border' key={d?._id}>
          <h1>{d?.name}</h1>
          <h1>{d?.detail}</h1>
        </div>
      ))}
    </div>
  )
}

export default AdminMovieList
