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
import { useGetAllUserQuery, useGetUserByIdQuery } from '../../services/redux/api/user'
import OnlineUsers from '../../components/OnlineUsers'



// const socket = io.connect('http://localhost:5005') 

const Message = () => {

  const socket = useRef()
  const scrollRef =useRef()
  
  const [isRead, setIsRead] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isUnread, setIsUnread] = useState(false);
  const [chatBuddy, setChatbuddy]  = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [onlineUsers, setOnlineUsers] = useState([])
  const [currentChat, setCurrentChant] = useState(null)
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [activeToggle, setIsActiveToggle] = useState('read');
  const [userAddToChat, setUserAddToChat] = useState([])

  // Toggle For Read and unread
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
  
  //redux current user message api
  const { userInfo } = useSelector((state) => state.auth);
  const { data:userMessage, isLoading } = useGetUserMessageByIdQuery(userInfo?.id);
  const { data:currentConvo, refetch} = useGetConverstaionByIdQuery(currentChat?._id)
  const { data:allusers, isLoading:AllUserloading} = useGetAllUserQuery()
  const { data:users} = useGetUserByIdQuery(chatBuddy)
  const [ createMessage] = useCreateMessageMutation()

  //Get all user that has no convo with current user
  useEffect(() => {
    if (userMessage && userMessage.length > 0 && allusers && allusers.length > 0) {
      const userMap = userMessage.map((user) => user);
      const allMemberIds = userMap.flatMap((m) => m.members);
      const otherMemberIds = allMemberIds.filter((id) => id !== userInfo?.id);
  
  
      const idsToRemove = otherMemberIds
      const filteredAllusers = allusers.filter(
        (user) => !idsToRemove.includes(user._id) && user._id !== userInfo.id
      );
      setUserAddToChat(filteredAllusers);
    }
  }, [userMessage, allusers]);


  // console.log(currentChat)
  useEffect(() => {
    setMessages(currentConvo)
  
  },[currentConvo])

  useEffect(() => {
    const id = currentChat?.members?.find((m) => m !== userInfo?.id)
    setChatbuddy(id)
  },[currentChat, userInfo])

  // socket io 
  useEffect(() => {
    socket.current = io('http://localhost:5005')
    socket.current.on("getMessage" , data => {
      setArrivalMessage({
        sender:data.senderId,
        content:data.content,
        createdAt:Date.now()
      })
    })
  },[])


  // Get all user connected in socket.io
  useEffect(() => {
    if (AllUserloading) return;
    socket.current.emit("addUser", userInfo.id);
    socket.current.on("getUsers", (users) => {
      
      const allUserOnline = allusers.filter(function (f) {
            return (
              users.some(function (u) {
                return u.userId === f._id;
              }) && f._id !== userInfo.id
            );
          })
      setOnlineUsers(allUserOnline)
      
    });
  }, [userInfo, socket, allusers]);

  //The data from io socket io will be push in message
  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && 
    setMessages(prev => [...prev, arrivalMessage])
  },[arrivalMessage, currentChat])

  
  const handleSubmit = async(e) => {
    e.preventDefault()
    const message = {
      sender:userInfo?.id,
      content:newMessage,
      conversationId:currentChat?._id
    }

    const recieverId = currentChat?.members?.find((m) => m !== userInfo?.id)

    socket.current.emit("sendMessage",{
          senderId: userInfo?.id,
          recieverId,
          content:newMessage
    })

    try {
      await createMessage(message).unwrap()
      setNewMessage('')
      refetch()
    } catch (error) {
      console.log(error.data.message)
    }
   
  }

  //useref using scrollIntoView Javascript DOM
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({behavior:'smooth'})
  },[messages])

  

  if(isLoading || isLoading ){
    return;
  } 

  return (
    <section className='mt-[70px] size-full  flex'>
      <div className='bg-slate-900 flex-[1.4] w-full h-[calc(100vh-70px)]  flex flex-col justify-start items-center gap-4 '>
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
          <ChatHeader currentConvo={users}/>
          <div className='w-full flex-1 flex flex-col items-end overflow-auto h-full'>
           {currentChat ? (
              <React.Fragment>
                {messages.map((m, index) => {

                  return (
                    
                  <React.Fragment key={index}>
                    <div 
                       ref={scrollRef}
                        className='w-full max-w-80'
                        style={{
                        
                          color: m.sender === userInfo?.id ? '#64748b' : '#000',
                          marginLeft: m.sender  === userInfo?.id ? 'auto' : '0',
                          marginRight: m.sender  === userInfo?.id ? '20px' : 'auto',
                          padding:'20px',
                          fontWeight:'600'
                        }}
                    >
                      
                      <div
                      className='flex'
                        style={{
                          backgroundColor: m.sender  === userInfo?.id ? '#0f172a' : '#64748b',
                          padding:'20px',
                          borderRadius: m.sender  === userInfo?.id ? '20px 20px 0px 20px'  :'40px 20px 20px 0',
                          border:'1px solid #0f172a'

                        }}>
                         {m.sender !== userInfo?.id && users && (
                          <div className='border-r-white'>
                              <Avatar alt={users.username} src={'profilepic'} />
                          </div>
                          
                          )}
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
      <div className='bg-slate-900 flex-[1.4] w-full h-[calc(100vh-70px)] flex flex-col p-4 '>
        <div className='w-full flex flex-col space-y-5 p-4 border-b-2 border-b-slate-950'>
          <h1 className='font-bold'>Add to Chat List</h1>
          <input type="text"  placeholder='search movie mate ' className='py-2 px-4 border border-white rounded-md'/>
        </div>
            <AddChatBuddy allusers={userAddToChat} currentId={userInfo?.id} setCurrentChat={setCurrentChant} />
            <OnlineUsers onlineUsers={onlineUsers} currentId={userInfo?.id} setCurrentChat={setCurrentChant}/>
      </div>
    </section>
  )
}

export default Message
