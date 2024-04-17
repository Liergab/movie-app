import { Button, dividerClasses } from '@mui/material'
import { IoSend } from "react-icons/io5";
import React from 'react'

const MessageInput = ({handleClick,onChange, value}) => {
  return (
    
    <div className='flex items-center  justify-center sticky w-full bottom-0 bg-slate-950 p-4  gap-2'>
        <input 
            type='text' 
            placeholder='Message' 
            value={value}
            className='w-full max-w-96 py-2 border border-slate-800 px-2 rounded-sm' 
            onChange={onChange}
        />
        <Button variant='outlined'  endIcon={<IoSend />} size='large' onClick={handleClick}>
            send
        </Button>
    </div>
  )
}

export default MessageInput