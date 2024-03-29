import React from 'react'
import { useGetAllUserQuery } from '../services/redux/api/user'


const Home = () => {

  const{data, isLoading} = useGetAllUserQuery()
  if(isLoading)return <h1>Loading..</h1>

  return (
    <div>
      Home
      <ul>
        {data.map((dt) => (
          <li key={dt?._id}>
            {dt?.username}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
