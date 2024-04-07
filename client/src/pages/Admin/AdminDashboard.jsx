import * as React     from 'react';
import List           from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText   from '@mui/material/ListItemText';
import AdminMovieList from './AdminMovieList';
import CreateMovie    from './CreateMovie';
import AllComments    from './AllComments';
import GenreList      from './GenreList';


export default function AdminDashboard() {
  
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className='mt-16 w-full  h-screen flex'>
      <div className='bg-slate-950 hidden md:block fixed h-screen w-full max-w-48 mt-[-64px]'>
        <List component="nav" aria-label="secondary mailbox folder" 
            sx={{
                marginTop:'150px',
                 display:'flex',
                 flexDirection:'column',
                 justifyContent:'space-around',
                 height:'50%',
                 padding:'10px'
            }}
        >
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemText primary="All Movies" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemText primary="Create Movies" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemText primary="All Comments" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
          >
            <ListItemText primary="Genre Create" />
          </ListItemButton>
        </List>
      </div>
      <div className='flex-0 md:flex-[1.02]'>

      </div>
      <div className=' flex-[8]'>
        {selectedIndex === 1 && <AdminMovieList/>}
        {selectedIndex === 2 && <CreateMovie/>}
        {selectedIndex === 3 && <AllComments/>}
        {selectedIndex === 4 && <GenreList/>}

      </div>

     {/* mobile view */}
     <div className=' bg-slate-800 block md:hidden fixed bottom-0 h-16 w-full max-w-full mx-auto '>
        <List component="nav" aria-label="secondary mailbox folder" sx={{ display:'flex', gap:'2px', borderRadius:'10px', alignItems:'center', justifyContent:'center', width:'100%'}}>
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemText primary="🎥" sx={{fontSize:'4px'}}/>
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemText primary="🎬" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemText primary="💭" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
          >
            <ListItemText primary="🎭" />
          </ListItemButton>
        </List>
      </div>
    </div>
  );
}
