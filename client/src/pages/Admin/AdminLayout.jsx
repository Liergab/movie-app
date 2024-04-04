import React from 'react'
import { Outlet, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetCurrentUserQuery } from '../../services/redux/api/user'

const AdminLayout = () => {

     const {userInfo} = useSelector((state) => state.auth)
     const{data:currentUser, isLoading} = useGetCurrentUserQuery()

     if(isLoading) return <h1>Loading..</h1>

  return userInfo &&  userInfo.isAdmin 
        && currentUser.isAdmin 
        ? <Outlet/> 
        : <Navigate to='/login' />
  
}

export default AdminLayout
