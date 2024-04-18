import React, { useEffect, useState } from 'react'
import { Avatar, Badge } from '@mui/material'
import { useGetConverstaionByTwoQuery } from '../services/redux/api/message'

const OnlineUsers = ({ onlineUsers, currentId, setCurrentChat }) => {
    const [user, setUser] = useState(null)
    const { data, isLoading, isError } = useGetConverstaionByTwoQuery([currentId, user], {
      skip: user === null,
    })
  
    const handleClick = (id) => {
      setUser(id)
    }
  
    useEffect(() => {
      if (data && !isLoading && !isError) {
        setCurrentChat(data)
      }
    }, [data, isLoading, isError, setCurrentChat])
  
    if (isLoading) {
      return <div>Loading...</div>
    }

  return (
    <section className="flex-1 h-full w-full p-4">
        <h1 className='font-bold text-white'>Online User</h1>
        {onlineUsers.map((o) => (
            <div key={o?._id} className='flex flex-col mt-2 '>
                <div className='flex items-center gap-1 ' onClick={() => handleClick(o?._id)}>
                <Badge color="success" overlap="circular" badgeContent=" " variant="dot">
                    <Avatar alt={o?.username} src={'profilepic'} sx={{background:'#f87171'}}/>
                </Badge>
                    <h1 >{o?.username}</h1>
                </div>
            </div>
        ))}
    </section>
  )
}

export default OnlineUsers