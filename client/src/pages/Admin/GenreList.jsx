import { Button, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {  useAllGenreQuery, useCreateGenreMutation, useDeleteGenreMutation, useUpdateGenreMutation } from '../../services/redux/api/genre'
import { toast } from 'react-toastify'
import ModalUI from '../../components/ui/ModalUI'
import GenreForm from '../../components/ui/GenreForm'

const GenreList = () => {

  const [name, setName] = useState('')
  const [updatingName, setUpdatingName] = useState('')
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [modalVisible, setModalVisible] = useState(false);
  
  const [createGenre,{isLoading:createLoading,isSuccess}] = useCreateGenreMutation()
  const [deleteGenre] = useDeleteGenreMutation()
  const [updateGenre] = useUpdateGenreMutation()
  const {data:allGenre, isLoading:allGenreLoading} = useAllGenreQuery()

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      await createGenre({name}).unwrap()
      toast.success(`Succesfully Added ${name}`)
      isSuccess(setName(''))
    } catch (error) {
      toast.error(error.data.message)
    }
  }

  const handleUpdateGenre = async (e) => {
    e.preventDefault();

    if (!updateGenre) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        data: {
          name: updatingName,
        },
      }).unwrap();

      if (result.data?.message) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedGenre(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.data?.message)
    }
  };

  const handleDeleteGenre = async () => {
    try {
      const result = await deleteGenre(selectedGenre._id).unwrap();

      if (result.data?.message) {
        toast.error(result.error);
      } else {
        toast.success(`${updatingName} is deleted.`);
        setSelectedGenre(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Genre deletion failed. Tray again.");
    }
  };

  return (
    <div className='h-screen w-full  flex items-center justify-center p-4'>
      <div className='w-full max-w-5xl  h-full max-h-96 flex flex-col items-center justify-center space-y-6'>
          <div className='w-full max-w-xl flex flex-row'>
            <h1 className='text-2xl font-bold'>GENRE</h1>
          </div>
          <form onSubmit={handleSubmit} className='w-full flex flex-col items-center justify-center space-y-6'>
            <input 
              type='text'
              placeholder='Write Genre name' 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='border border-slate-200 bg-slate-800 p-2 w-full max-w-xl rounded-md placeholder:text-slate-600 focus-within:text-slate-400'
            />
            <div className='w-full max-w-xl flex flex-row '>
              <Button 
                type='submit'
                variant='outlined'
                disabled={createLoading}
              >
                Submit
              </Button>
            </div>
          </form>
          {allGenreLoading ? (
            <CircularProgress />
          ) : (
            <div className='w-full max-w-xl flex items-center justify-center gap-2 flex-wrap'>
              {allGenre?.map((genre) => (
                <div key={genre?._id} >
                  <Button variant='outlined' color='primary' onClick={() => { setModalVisible(true);  setSelectedGenre(genre); setUpdatingName(genre?.name) }}>
                    {genre?.name}
                  </Button>
                  
                </div>
              ))}
            </div>
          )}
      </div>
      <ModalUI isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <h1 className='text-2xl font-bold'>Update Genre</h1>
          <GenreForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateGenre}
            buttonText="Update"
            handleDelete={handleDeleteGenre}
          />
        </ModalUI>
    </div>
  )
}

export default GenreList
