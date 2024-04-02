import React, { useState } from 'react'
import { useAllGenreQuery } from '../../services/redux/api/genre'
import { Button } from '@mui/material'
import SliderUI from '../../components/ui/SliderUI'
import { useGetNewMoviesQuery, useGetRandomMoviesQuery, useGetTopMoviesQuery } from '../../services/redux/api/movie'

const MovieContainerPage = () => {
    const[selectGenre, setSelectGenre] = useState(null)

    const{data:genres, isLoading} = useAllGenreQuery()
    const{data:randomData} = useGetRandomMoviesQuery()
    const{data:topMovies} = useGetTopMoviesQuery()
    const{data} = useGetNewMoviesQuery()
    
    const handleClick = (id) => {
        setSelectGenre(id)
    }

    const filteredMovies = data?.filter((movie) => {
        if (selectGenre === null) {
          return true; 
        } else {
          return movie.genre === selectGenre; 
        }
      });

  return (
    <div className='flex flex-col md:flex-row w-full px-4 md:px-14 gap-20'>
     <div className='flex   md:h-screen items-center justify-center mb-[6rem]'>
        <nav className='flex flex-row flex-wrap md:flex-col items-start justify-around h-full max-h-40 md:max-h-96 px-4  md:px-10 gap-2'>
           {genres?.map((genre) => (
              <Button 
                 variant="outlined" 
                 color="inherit" 
                 key={genre?._id} 
                 className='hover:border-blue-900'
                 onClick={() =>handleClick(genre?._id)}
             >
                 {genre?.name}
             </Button>
           ))}
        </nav>
      </div>
      <div className='flex-[5] w-full max-w-5xl flex flex-col gap-14 mb-40'>
        <div className='flex flex-col gap-4'>
            <h1 className='text-xl font-bold'>Random Movie</h1>
             <SliderUI data={randomData} />
        </div>
        <div className='flex flex-col gap-4'>
            <h1 className='text-xl font-bold'>Top Movies</h1>
             <SliderUI data={topMovies} />
        </div>
        <div className='flex flex-col gap-4'>
            <h1 className='text-xl font-bold'>Choose Movie</h1>
             <SliderUI data={filteredMovies} />
        </div>
      </div>
    </div>
  )
}

export default MovieContainerPage
