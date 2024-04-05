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
import GenreList               from './pages/Admin/GenreList'
import AdminDashboard          from './pages/Admin/AdminDashboard'
import CreateMovie             from './pages/Admin/CreateMovie'
import AdminMovieList          from './pages/Admin/AdminMovieList'
import UpdateMovie             from './pages/Admin/UpdateMovie'
import MovieDetails from './pages/movies/MovieDetails'
import AllComments from './pages/Admin/AllComments'
import DashBoard from './pages/Admin/Dashboard/DashBoard'

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
      </Route>

       //Admin private routes
      <Route path="" element={<AdminLayout/>}>
        <Route path='/admin/movies/dashboard' element={<AdminDashboard/>} />
        {/* <Route path='admin/movies/genre'      element={<GenreList/>}/> */}
        {/* <Route path='admin/movies/create'     element={<CreateMovie/>}/> */}
        {/* <Route path='admin/movies-list'       element={<AdminMovieList/>} /> */}
        <Route path='admin/movies/update/:id' element={<UpdateMovie/>} />
        {/* <Route path='admin/movies/comments'   element={<AllComments/>} /> */}
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
