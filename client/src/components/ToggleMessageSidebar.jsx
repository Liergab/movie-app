import { Button } from '@mui/material'
import React from 'react'

const ToggleMessageSidebar = ({handleToggle, activeToggle}) => {

    const toggleLinks = [
        {
            label:'Read',
            toggle:'read'
        },
        {
            label:'UnRead',
            toggle:'unread'
        }
    ]
  return (
    <section className='flex gap-10 bg-slate-900 w-full p-5 border-b-2 border-b-slate-950'>
        {toggleLinks.map((tb, index) => (
            <React.Fragment key={index}>
                <Button onClick={() => handleToggle(tb.toggle)}
                    sx={{ 
                        borderRadius: '20px', 
                        backgroundColor: activeToggle === tb.toggle ? '#EF4040':'#d3dce6', 
                        color: activeToggle === tb.toggle? '#E8F1F3' :'#508E9B',
                        fontSize:'16px',
                        '&:hover':{
                            color: activeToggle === tb.toggle? '#E8F1F3' :'#508E9B',
                            backgroundColor: activeToggle === tb.toggle ? '#EF4040':'#d3dce6', 
                        },
                        padding:'3px 28px',
                        fontWeight:'bold',
                        '@media (max-width: 600px)': {
                            fontSize: '12px',
                            padding:'5px 25px',
                        },
                    }}
                
                >
                    {tb.label}
                </Button>
            </React.Fragment>
        ))}
    </section>
  )
}

export default ToggleMessageSidebar
