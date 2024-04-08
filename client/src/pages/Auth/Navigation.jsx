import { useState }           from 'react';
import {Link, useNavigate}    from 'react-router-dom'
import { useGetCurrentUserQuery, useLogoutMutation }  from '../../services/redux/api/user';
import { logout }             from '../../services/redux/features/auth/authSlice';
import {useSelector, 
        useDispatch}          from "react-redux";

//material Ui
import { Button,
         Divider, 
         Drawer,
         LinearProgress }      from '@mui/material';
// Icon
import { IoHome }              from "react-icons/io5";
import { MdLocalMovies }       from "react-icons/md";
import { IoMdLogIn }           from "react-icons/io";
import { PiUserPlus }          from "react-icons/pi";
import { CgProfile }           from "react-icons/cg";
import { CiLogout }            from "react-icons/ci";
import { RxDashboard }         from "react-icons/rx";
import { BsMenuDown }          from "react-icons/bs";
import { BsMenuUp }            from "react-icons/bs";




export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // getting the data of the current user using cookieParser
  const {data:currentUser, isLoading:isLoadingCurrentUser} = useGetCurrentUserQuery()

  //getting the data of user in localstorage
  const {userInfo} = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const[logoutApiCall] = useLogoutMutation()

  const handleLogout = async() => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate("/login");
    } catch (error) {
      console.log(error.message)
    }
  }

  if(isLoadingCurrentUser){
    return <LinearProgress />
  }

  const DrawerList = (
    <div className='w-[150px] h-screen flex flex-col justify-between bg-slate-800 text-slate-400 border-r-2 border-r-slate-400 gap-4' onClick={toggleDrawer(false)}>
      
      <div className='flex-[1] w-full flex flex-col items-center justify-center gap-2'>
          <Link to='/' className='transition delay-150 duration-300 ease-in-out hover:bg-slate-700 flex items-center justify-center w-full p-4 cursor-pointer '>
            <div className='flex flex-col items-end justify-center gap-2'>
              <IoHome className='hover:scale-125 transition-all mx-auto' size={30}/>
              <small className='text-[10px]'>HOME</small>
            </div>
          </Link>
          <Link to='/movies' className='transition delay-150 duration-300 ease-in-out hover:bg-slate-700 flex items-center justify-center w-full p-4 cursor-pointer '>
            <div className='flex flex-col items-end justify-center gap-2'>
              <MdLocalMovies className='hover:scale-125 transition-all mx-auto' size={30} />
              <small className='text-[10px] text-center'>MOVIES</small>
            </div>
          </Link>
      </div>
      <Divider  className='bg-slate-50'/>
      <div className='flex-[1.7] w-full flex flex-col items-center justify-center gap-2'>
        <Link to={userInfo ? '/profile' : '/login'} className='transition delay-150 duration-300 ease-in-out hover:bg-slate-700 flex items-center justify-center w-full p-4 cursor-pointer '>
          {!userInfo && 
           <div className='flex flex-col items-end justify-center gap-2'>
            <IoMdLogIn className='hover:scale-125 transition-all mx-auto'  size={30}/>
            <small className='text-[10px]'>LOGIN</small>
           </div>
          }
          {userInfo && currentUser &&  (<h1 className='mx-auto'>{userInfo?.username.toUpperCase()}</h1>)}
        </Link>

        {userInfo && userInfo?.isAdmin && currentUser.isAdmin &&
        <Link to='/admin/movies/dashboard' className='transition delay-150 duration-300 ease-in-out hover:bg-slate-700 flex items-center justify-center w-full p-4'>
          <div className='flex flex-col items-end justify-center gap-2'>
            <RxDashboard  className='hover:scale-125 transition-all mx-auto'  size={30}/>
            <small className='text-[10px]'>DASHBOARD</small>
            </div>
        </Link>
        }

        <Link to={userInfo && currentUser ? '/profile' : 'register'} className='transition delay-150 duration-300 ease-in-out hover:bg-slate-700 flex items-center justify-center w-full p-4'>
          {!userInfo && 
            <div className='flex flex-col items-end justify-center gap-2'>
              <PiUserPlus className='hover:scale-125 transition-all mx-auto'  size={30}/>
              <small className='text-[10px]'>REGISTER</small>
            </div>
          }
          {userInfo && currentUser &&
            <div className='flex flex-col items-end justify-center gap-2'>
              <CgProfile className='hover:scale-125 transition-all mx-auto'  size={30} />
              <small className='text-[10px]'>PROFILE</small>
            </div>
          }
        </Link>
        {userInfo && currentUser &&
        <div 
           onClick={handleLogout}
          className='transition delay-150 duration-300 ease-in-out hover:bg-slate-700 flex items-center justify-center w-full p-4'>
          <div className='flex flex-col items-end justify-center gap-2'>
            <CiLogout className='hover:scale-125 transition-all mx-auto'  size={30}/>
            <small className='text-[10px]'>LOGOUT</small>
          </div>
        </div>
        }
       
      </div>
    </div>
  );

  return (
    <div className='fixed z-20 w-full top-0  '>
      <div className='flex flex-row-reverse bg-slate-800 bg-opacity-80 p-4'>
        <Button 
          variant="contained" 
          color='inherit'
          onClick={toggleDrawer(true)} 
          endIcon={open ? <BsMenuDown /> : <BsMenuUp />}
          className='sticky'
      >
          MENU
        </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
    </div>
  );
}