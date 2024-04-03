import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from '@mui/material'
import { IoHomeSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import SliderUI from '../../components/ui/SliderUI';
import { useGetNewMoviesQuery } from '../../services/redux/api/movie'

const Header = () => {
    const {data:NewMovies} = useGetNewMoviesQuery()
  return (
    <div className='flex flex-col md:flex-row w-full px-4  md:px-14 gap-20 mt-[6rem]'>
     <nav className='flex flex-col items-start justify-around h-full max-h-40  p-2 gap-2'>
        <Link to='/'>
            <Button variant='outlined' startIcon={<IoHomeSharp className='w-4' />} color="inherit" className='hover:border-blue-900 ' >
              Home
            </Button>
        </Link>
        <Link to='/movies'>
            <Button variant='outlined' startIcon={<IoSearch className='w-4 ' />} color="inherit" className='hover:border-blue-900 '>
                 Browsed Movies
            </Button>
        </Link>
     </nav>
     <div className='flex-[5] w-full max-w-5xl'>
        <SliderUI data={NewMovies} />
     </div>
    </div>
  )
}

export default Header
