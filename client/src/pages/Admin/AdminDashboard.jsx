import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DashBoard from './Dashboard/DashBoard';
import AdminMovieList from './AdminMovieList';
import CreateMovie from './CreateMovie';
import AllComments from './AllComments';
import GenreList from './GenreList';
// import InboxIcon from '@mui/icons-material/Inbox';
// import DraftsIcon from '@mui/icons-material/Drafts';

export default function AdminDashboard() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className='mt-16 w-full  h-screen flex'>
      <div className='bg-slate-950 fixed h-screen w-full max-w-48 mt-[-64px]'>
        <List component="nav" aria-label="secondary mailbox folder" sx={{marginTop:'64px'}}>
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
      <div className='flex-[1.02]'>

      </div>
      <div className=' flex-[8]'>
        {selectedIndex === 1 && <AdminMovieList/>}
        {selectedIndex === 2 && <CreateMovie/>}
        {selectedIndex === 3 && <AllComments/>}
        {selectedIndex === 4 && <GenreList/>}

      </div>
    </div>
  );
}
