import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useGetUserByIdQuery } from '../services/redux/api/user'

const ChatHeader = ({currentConvo,  currentUser}) => {
    const [chatbuddy, setChatbuddy] = useState(null)
    useEffect(() => {
        const chatbuddyInfo = currentConvo?.find((c) => c.sender !== currentUser?.id)
        setChatbuddy(chatbuddyInfo)
       
    },[currentConvo])

    const { data:users ,  isLoading } = useGetUserByIdQuery(chatbuddy?.sender);
    if(isLoading) return;

  return (
    <div className='sticky top-0 bg-gray-950 p-4 z-10'>
        <div className='flex items-center gap-2' >
            <Avatar alt={users?.username} src={'profilepic'} sizes='small'/>
            <p>{users?.username}</p>
        </div>
    </div>
  )
}

export default ChatHeader