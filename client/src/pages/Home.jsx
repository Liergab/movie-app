import React from 'react'
import { useGetAllUserQuery } from '../services/redux/api/user'
import Header from './movies/Header'
import MovieContainerPage from './User/MovieContainerPage'


const Home = () => {

  // const{data, isLoading} = useGetAllUserQuery()
  // if(isLoading)return <h1>Loading..</h1>

  return (
    <div>
     <Header />

     <section className='mt-[10rem]'>
        <MovieContainerPage  />
     </section>
    </div>
  )
}

export default Home
