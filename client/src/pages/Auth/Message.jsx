import '../../components/style/message.css'
import React, { 
       useEffect, 
       useRef, useState }             from 'react'
import {Avatar}                       from '@mui/material'
import ToggleMessageSidebar           from '../../components/ToggleMessageSidebar'
import ReadMessage                    from '../../components/ReadMessage'
import UnreadMessage                  from '../../components/UnreadMessage'
import MessageInput                   from '../../components/MessageInput'
import { useSelector }                from 'react-redux'
import ChatHeader                     from '../../components/ChatHeader'
import { timeAgo }                    from '../../hooks/FormDate'
import AddChatBuddy                   from '../../components/AddChatBuddy'
import io                             from 'socket.io-client'

import { useCreateMessageMutation,
         useGetConverstaionByIdQuery,
         useGetUserMessageByIdQuery } from '../../services/redux/api/message'



// const socket = io.connect('http://localhost:5005') 

const Message = () => {
  const socket = useRef()
  const scrollRef =useRef()
  const [isRead, setIsRead] = useState(false);
  const [isUnread, setIsUnread] = useState(true);
  const [newMessage, setNewMessage] = useState('')
  const [currentChat, setCurrentChant] = useState(null)
  const [activeToggle, setIsActiveToggle] = useState('unread');
  
  const handleToggle = (toggle) => {
    setIsRead(false);
    setIsUnread(false);
    setIsActiveToggle(toggle);
    if (toggle === 'read') {
      setIsRead(true);
    } else if (toggle === 'unread') {
      setIsUnread(true);
    }
  };
  
  const { userInfo } = useSelector((state) => state.auth);
  const { data:userMessage, isLoading } = useGetUserMessageByIdQuery(userInfo?.id);
  const {data:currentConvo, isLoading:convoLoading, refetch} = useGetConverstaionByIdQuery(currentChat?._id)
  const [createMessage] = useCreateMessageMutation()

  
  useEffect(() => {
    socket.current = io('http://localhost:5005')
  },[])

  useEffect(() => {
    socket.current.emit("addUser", userInfo.id)
    socket.current.on("getUsers", users => {
      // console.log(users)
    })
  },[userInfo])
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    const message = {
      sender:userInfo?.id,
      content:newMessage,
      conversationId:currentChat?._id
    }

    try {
      await createMessage(message).unwrap()
      setNewMessage('')
      refetch()
      
    } catch (error) {
      console.log(error.data.message)
    }
   
  }

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({behavior:'smooth'})
  },[currentConvo])

  

  if(isLoading || isLoading ){
    return;
  } 

  return (
    <section className='mt-[70px] size-full  flex'>
      <div className='bg-slate-950 flex-[1.4] w-full h-[calc(100vh-70px)]  flex flex-col justify-start items-center gap-4 '>
        <ToggleMessageSidebar handleToggle={handleToggle} activeToggle={activeToggle}/>

        {isRead && 
            <div>
              {userMessage.map((c) => ( 
                <div onClick={() => setCurrentChant(c)} key={c?._id}>
                   <ReadMessage conversation={c} currentUser={userInfo} /> 
               </div>
              ))}
            </div>
          }

          {isUnread && <UnreadMessage/>}
      </div>
      <div className='bg-slate-800 flex-[4] h-[calc(100vh-70px)] relative flex flex-col '>
          <ChatHeader currentConvo={currentConvo} currentUser={userInfo}/>
          <div className='w-full flex-1 flex flex-col items-end overflow-auto h-full'>
           {currentChat ? (
              <React.Fragment>
                {currentConvo.map((m, index) => {

                  return (
                    
                  <React.Fragment key={index}>
                    <div 
                       ref={scrollRef}
                        className='w-full max-w-80'
                        style={{
                        
                          color: m.sender === userInfo?.id ? '#fff' : '#000',
                          marginLeft: m.sender  === userInfo?.id ? 'auto' : '0',
                          marginRight: m.sender  === userInfo?.id ? '20px' : 'auto',
                          padding:'20px',
                        }}
                    >
                      
                      <div
                      className='flex'
                        style={{
                          backgroundColor: m.sender  === userInfo?.id ? '#039be5' : '#f44336',
                          padding:'20px',
                          borderRadius: m.sender  === userInfo?.id ? '20px 20px 0px 20px'  :'40px 20px 20px 0'
                        }}>
                        {!m.sender && <Avatar alt={users?.username} src={'profilepic'}/>}
                          <div className='ml-[20px]'>
                            <h1>{m.content}</h1>
                            <small>{timeAgo(new Date(m?.createdAt))}</small>
                          </div>
                      </div>
                    </div>
                  </React.Fragment>
                  )
                })}
              </React.Fragment>
            ): (
              <span className="text-2xl size-full flex items-center justify-center">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
       
        <MessageInput handleClick={handleSubmit} onChange={(e) => setNewMessage(e.target.value)} value={newMessage} />

      </div>
      <div className='bg-slate-950 flex-[1.4] w-full h-[calc(100vh-70px)] '>
            <AddChatBuddy />
      </div>
    </section>
  )
}

export default Message
