import React, { useEffect, useState } from 'react'
import {useGetUserByIdQuery } from '../services/redux/api/user'
import { Avatar } from '@mui/material'
import profilepic from '../assets/profilepic.png'

const ReadMessage = ({conversation, currentUser}) => {
   
    const [chatbuddy, setChatbuddy] = useState(null);

    useEffect(() => {
      const findChatbuddy = () => {
        const chatbuddyId = conversation?.members?.find((m) => m !== currentUser.id);
        setChatbuddy(chatbuddyId);
        
      };
      findChatbuddy();
    }, [conversation, currentUser]);
  
    const { data:users ,  isLoading } = useGetUserByIdQuery(chatbuddy);
  
    if (isLoading || !chatbuddy) return <div>Loading...</div>;

    
    
  return (
    <section className='w-full'>
        <div className='flex border-blue-50  gap-4 py-4 px-24 text-white w-full hover:bg-slate-600 cursor-pointer'>
            <div className='flex items-center gap-2 w-full'>
                 <Avatar alt={users?.username} src={profilepic}/>
                {users?.username}
            </div>
        </div>
    </section>
  )
}

export default ReadMessage
