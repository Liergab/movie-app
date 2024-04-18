import { Avatar } from '@mui/material'
import React from 'react'


const ChatHeader = ({currentConvo}) => {
  return (
    <div className='sticky top-0 bg-slate-800 p-4 z-10 border-b-2 border-b-slate-900'>
      {currentConvo 
        ?
          <div className='flex items-center gap-2' >
              <Avatar alt={currentConvo?.username} src={'profilepic'}/>
              <p className='font-bold'>{currentConvo?.username}</p>
          </div>
        :(
          <h1>Open a conversation to start a chat.</h1>
         )
      }
    </div>
  )
}

export default ChatHeader