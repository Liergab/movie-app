import { Avatar } from '@mui/material'
import React from 'react'

const AddChatBuddy = ({allusers}) => {


  console.log(allusers)
  return (
    <section className='p-4 flex-1 flex flex-col border-b-2 border-b-slate-950 space-y-4'>
      <h1 className='font-bold mt-[-10px]'>Add to Chat List</h1>
        <input type="text"  placeholder='search movie mate ' className='py-2 px-4 border border-white rounded-md'/>

        {allusers.map((user) => (
          <div key={user?._id} className='flex flex-col mt-2 cursor-pointer'>
              <div className='flex items-center gap-2 w-full '>
                 <Avatar alt={user?.username} src={'profilepic'} />
                {user?.username}
            </div>
          </div>
        ))}
    </section>
  )
}

export default AddChatBuddy