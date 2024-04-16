import React                    from 'react'
import ReactDOM                 from 'react-dom/client'
import App                      from './App'
import './index.css'
import { Route, 
  RouterProvider, 
  createRoutesFromElements}    from 'react-router'
import {createBrowserRouter}   from 'react-router-dom'
import {Provider}              from 'react-redux'
import store                   from './services/redux/store'

// routes
import Login                   from './pages/Auth/Login'
import Home                    from './pages/Home'
import Register                from './pages/Auth/Register'
import PrivateRoute            from './pages/Auth/PrivateRoute'
import Profile                 from './pages/User/Profile'
import AllMovie                from './pages/movies/AllMovie'
import AdminLayout             from './pages/Admin/AdminLayout'
import AdminDashboard          from './pages/Admin/AdminDashboard'
import UpdateMovie             from './pages/Admin/UpdateMovie'
import MovieDetails            from './pages/movies/MovieDetails'
import Message                 from './pages/Auth/Message'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >

      <Route index={true} path='/' element={<Home/>}/>
      <Route  path='/login'        element={<Login/>}/>
      <Route  path='/register'     element={<Register/>}/>
      <Route  path='/movies'       element={<AllMovie/>} />
      <Route  path='/movies/:id'   element={<MovieDetails />}/>
      
      //user private routes
      <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>} />
          <Route path='/messages' element={<Message/>}/>
      </Route>

       //Admin private routes
      <Route path="" element={<AdminLayout/>}>
        <Route path='/admin/movies/dashboard' element={<AdminDashboard/>} />
        <Route path='admin/movies/update/:id' element={<UpdateMovie/>} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
)
