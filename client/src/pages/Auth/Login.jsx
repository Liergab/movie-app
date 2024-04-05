import React, { useEffect, useState }    from 'react'
import {Link, useLocation, useNavigate}  from "react-router-dom"
import { useDispatch, useSelector }      from 'react-redux'
import { setCredentials }                from '../../services/redux/features/auth/authSlice'
import { useLoginMutation}               from '../../services/redux/api/user'
import {toast}                           from 'react-toastify'
import { Button, CircularProgress, }     from '@mui/material'

const Login = () => {

    const [email, setEmail]        = useState("");
    const [password, setPassword]  = useState("");
    

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login,{isLoading}] = useLoginMutation()

    const {userInfo} = useSelector((state) => state.auth)

    const {search} = useLocation
    const sp = new URLSearchParams(search)
   
    const redirect = sp.get("redirect") || "/"

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
            try {
                const res = await login({email, password}).unwrap()
                dispatch(setCredentials({...res}))
                navigate(redirect)
                toast.success("User successfully login")
            } catch (err) {
                toast.error(err.data.message)
            }
    }

  return (
    <div className='w-full h-screen flex items-center justify-center  '>
        <div className='w-full flex max-w-6xl p-4'>
            <div className='hidden bg-slate-700 md:flex-[1.3] md:flex items-center justify-center rounded-tl-md rounded-bl-md '>
             <h1>hello</h1>
            </div>
            <div className='flex-[1] flex flex-col items-center justify-center bg-slate-950 h-full md:h-auto rounded-tr-md rounded-br-md gap-6 py-10 px-4 '>
                <div className='flex flex-col  justify-center space-y-4'>
                    <h1 className='text-2xl font-bold'>Welcome to Movie-app 🎥!</h1>
                    <h1 className='text-lg font-semibold'>Please enter your credential to login!</h1>
                </div>
                <form onSubmit={submitHandler} className='w-full flex flex-col items-center justify-center gap-4'>
                   
                    
                      <input 
                        type='text'
                        placeholder='Email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border border-slate-200 bg-slate-800 p-2 w-full max-w-96 rounded-md'
                     />
                     
                      <input 
                        type='password'
                        placeholder='Password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border border-slate-200 bg-slate-800 p-2 w-full max-w-96 rounded-md'
                     />
                      
                     <Button 
                        disabled={isLoading}
                        type='submit'
                        variant="outlined" 
                        className=' w-full max-w-96'

                    >
                       {isLoading ? 'Login...' : 'Login'}
                    </Button>
                    {isLoading &&  <CircularProgress />}

                    <div>
                        <p>
                            Dont have an account? {" "}
                            <Link to={redirect ? `/register?redirect={redirect}`: '/register'}
                                className='hover:text-slate-200 underline'
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                   
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login
