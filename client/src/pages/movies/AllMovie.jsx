import React from 'react'
import { useGetCurrentUserQuery } from '../../services/redux/api/user'

const AllMovie = () => {

    // const { data: currentUser, isLoading } = useGetCurrentUserQuery();
    // if(isLoading) return <h1>lOADING...</h1>
    // console.log(currentUser.username)
  return (
    <div>
     All movies
    </div>
  )
}

export default AllMovie
