import { Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useProfileUpdateMutation } from '../../services/redux/api/user';
import { toast } from 'react-toastify';
import { setCredentials } from '../../services/redux/features/auth/authSlice';

const Profile = () => {
    const {userInfo} = useSelector((state) => state.auth)

    const [username, setUsername]  = useState("");
    const [email, setEmail]        = useState("");
    const [password, setPassword]  = useState("");
    const [conPass, setConPass]    = useState("");

    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const [profileUpdate,{isLoading}] = useProfileUpdateMutation()

    useEffect(() => {
        setUsername(userInfo?.username || '');
        setEmail(userInfo?.email || '');
      }, [userInfo]);

    const handleUpdate = async(e) => {
        e.preventDefault()

        if(password !== conPass){
            toast.error('Password does not match!')
        }else{
            try {
                const res = await profileUpdate({
                    username,
                    email,
                    password
                })
                dispatch(setCredentials({...res.data}))
                toast.success("Profile updated successfully");
                Navigate('/')
            } catch (error) {
                toast.error(err?.data?.message || err.error);
            }
        }

    }

  return (
    <div className='h-screen w-full flex items-center justify-center p-4'>
        <div className='h-auto w-full max-w-lg bg-slate-900 flex flex-col items-center justify-center rounded-md py-12 px-8 gap-6'>
            <div className='w-full max-w-96 flex flex-col items-center justify-center gap-3'>
                <h1 className='text-2xl font-bold'>UPDATE PROFILE</h1>
                <small className='text-sm text-center font-semibold'>If you haven't changed your password, your website password stays the same.</small>
            </div>
            <form onSubmit={handleUpdate}  className='w-full flex flex-col items-center justify-center gap-4'>
                <input 
                    type='text'
                    placeholder='Username' 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='border border-slate-200 bg-slate-800 p-2 w-full max-w-96 rounded-md'
                />
                    
                <input 
                    type='text'
                    placeholder='Email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border border-slate-200 bg-slate-800 p-2 w-full max-w-96 rounded-md'
                />
                     
                <input 
                    type='password'
                    placeholder='Password (Optional)' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border border-slate-200 bg-slate-800 p-2 w-full max-w-96 rounded-md'
                />
                <input 
                    type='password'
                    placeholder='Confirm Password' 
                    value={conPass}
                    onChange={(e) => setConPass(e.target.value)}
                    className='border border-slate-200 bg-slate-800 p-2 w-full max-w-96 rounded-md'
                />
                <Button 
                    disabled={isLoading}
                    type='submit'
                    variant="outlined" 
                    className=' w-full max-w-96'

                >
                    {isLoading ? 'Updating...' : 'Update'}
                </Button>
                    {isLoading &&  <CircularProgress />}
          </form>
        </div>
    </div>
  )
}

export default Profile
