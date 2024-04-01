import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  background:'#1e293b',
  borderRadius:'10px'
};

export default function ModalUI({isOpen, onClose, children}) {
  return (
    <div className='bg-slate-800'>
      <Modal
         open={isOpen}
         onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         {children}
        </Box>
      </Modal>
     
    </div>
  );
}