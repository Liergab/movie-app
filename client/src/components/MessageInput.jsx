import { Button, dividerClasses } from '@mui/material'
import { IoSend } from "react-icons/io5";
import React from 'react'

const MessageInput = ({handleClick,onChange, value}) => {
  return (
    
    <div className='flex items-center  justify-center sticky w-full bottom-0 bg-slate-800 p-4  gap-2 border-t-2  border-t-slate-900'>
        <input 
            type='text' 
            placeholder='Message' 
            value={value}
            className='w-full max-w-96 py-2 border-4 border-white px-2 rounded-lg' 
            onChange={onChange}
        />
        <Button 
          variant='outlined'  
          size='large' onClick={handleClick}
          endIcon={<IoSend />}  
          sx={{
            border:'2px solid #0f172a',
            
          }}
        >
            send
        </Button>
    </div>
  )
}

export default MessageInput