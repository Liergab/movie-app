import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useDeleteMovieMutation, useGetSpecificMovieQuery, useUpdateMovieMutation, useUploadImageMutation } from '../../services/redux/api/movie'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'
const UpdateMovie = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [movieData, setMovieData] = useState({
        name: "",
        year: 0,
        detail: "",
        cast: [],
        rating: 0,
        image: null,
      });
   
    const [selectedImage, setSelectedImage] = useState(null);

    

    const{data:currentmovie, isLoading:isLoadingMovie} = useGetSpecificMovieQuery(id)
    // if(isLoadingMovie) return <h1>Loading..</h1>

    const[deleteMovie] = useDeleteMovieMutation()

    useEffect(() => {
        if (currentmovie) {
          setMovieData(currentmovie);
        }
      }, [currentmovie]);

    const [updateMovie,{isLoading:isLoadingUpdate}] = useUpdateMovieMutation()
    const [uploadImage,{isLoading:isLoadingUploadImage,error: uploadImageErrorDetails}] = useUploadImageMutation()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
      };
      const handleUpdateMovie = async () => {
        try {
          if (
            !movieData.name ||
            !movieData.year ||
            !movieData.detail ||
            !movieData.cast
          ) {
            toast.error("Please fill in all required fields");
            return;
          }
    
          let uploadedImagePath = movieData.image;
    
          if (selectedImage) {
            const formData = new FormData();
            formData.append("image", selectedImage);
    
            const uploadImageResponse = await uploadImage(formData);
    
            if (uploadImageResponse.data) {
              uploadedImagePath = uploadImageResponse.data.image;
            } else {
              console.error("Failed to upload image:", uploadImageErrorDetails);
              toast.error("Failed to upload image");
              return;
            }
          }
    
          await updateMovie({
            id: id,
            updatedMovie: {
              ...movieData,
              image: uploadedImagePath,
            },
          });
    
          navigate("/admin/movies-list");
        } catch (error) {
          console.error("Failed to update movie:", error);
        }
      };

      const handleDelete = async() => {
        try {
            await deleteMovie(id)
            navigate('/admin/movies-list')
        } catch (error) {
             toast.error(error.data.message)
        }
      }
    

    
  return (
    <div className=' w-full h-screen flex items-center justify-center'>
        <div className='bg-slate-950 w-full max-w-2xl h-full max-h-[500px] rounded-md flex flex-col items-center justify-center'>
    
            <h1 className='text-2xl font-bold'>Create Movie</h1>
            <form   className='w-full flex flex-col items-center justify-center space-y-6'>
                <input 
                    type='text'
                    placeholder='Name of Movie' 
                    name='name'
                    value={movieData.name}
                    onChange={handleChange}
                    className='border border-slate-200 bg-slate-800 p-2 w-full max-w-xl rounded-md placeholder:text-slate-600 focus-within:text-slate-400'
                />
                <input 
                    type='number'
                    placeholder='Year' 
                    name='year'
                    value={movieData.year}
                    onChange={handleChange}
                    className='border border-slate-200 bg-slate-800 p-2 w-full max-w-xl rounded-md placeholder:text-slate-600 focus-within:text-slate-400'
                />
                <textarea
                    rows={2}
                    placeholder="Details"
                    name='detail'
                    value={movieData.detail}
                    onChange={handleChange}
                    className="border border-slate-200 bg-slate-800 p-2 w-full max-w-xl rounded-md placeholder:text-slate-600 focus-within:text-slate-400 resize-none overflow-hidden"
                    style={{ resize: "vertical", minHeight: "2rem", maxHeight: "12rem" }}
                />
                <input 
                    type='text'
                    placeholder='Cast (seperated by come)' 
                    name='cast'
                    value={movieData.cast}
                    onChange={handleChange}
                    className='border border-slate-200 bg-slate-800 p-2 w-full max-w-xl rounded-md placeholder:text-slate-600 focus-within:text-slate-400'
                />
               
            
                <div className='w-full max-w-xl flex flex-row '>
                    <label
                        style={
                        !selectedImage
                            ? {
                                border: "1px solid #888",
                                borderRadius: "5px",
                                padding: "8px",
                            }
                            : {
                                border: "0",
                                borderRadius: "0",
                                padding: "0",
                            }
                        }
                    >
                        {!selectedImage && "Upload Image"}
                        <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: !selectedImage ? "none" : "block" }}
                        />
                    </label>
                </div>


                <div className='w-full max-w-xl flex flex-row justify-between'>
                    <Button 
                        type="button"
                        onClick={handleUpdateMovie}
                        variant='outlined'
                        disabled={isLoadingUpdate || isLoadingUpdate}
                    >
                        {isLoadingUpdate || isLoadingUploadImage ? "Updating..." : "update Movie"}
                    </Button>
                    <Button 
                        type="button"
                        onClick={handleDelete}
                        variant='outlined'
                        color="warning"
                        disabled={isLoadingUpdate || isLoadingUpdate}
                    >
                        {isLoadingUpdate || isLoadingUploadImage ? "Deleting..." : "Delete Movie"}
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateMovie
