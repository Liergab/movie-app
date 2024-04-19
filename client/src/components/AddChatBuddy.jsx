import { Avatar } from '@mui/material'
import React from 'react'
import { useCreateConversationMutation } from '../services/redux/api/message'

const AddChatBuddy = ({allusers, currentId , setCurrentChat}) => {
  

  const [createConversation] = useCreateConversationMutation()

  const handleClick = async(id) => {
    try {
      const res = await createConversation({senderId:currentId,recieverId:id})
      console.log(res)
      setCurrentChat(res)
    } catch (error) {
      console.log(error.data.message)
    }
  }




  return (
    <section className='p-4 flex-1 flex flex-col border-b-2 border-b-slate-950 space-y-4 overflow-y-auto '>
     
        {allusers.map((user) => (
          <div key={user?._id} className='flex flex-col mt-2 cursor-pointer ' onClick={() => handleClick(user?._id)}>
              <div className='flex items-center gap-2 w-full'>
                 <Avatar alt={user?.username} src={'profilepic'} />
                {user?.username}
            </div>
          </div>
        ))}
    </section>
  )
}

export default AddChatBuddy