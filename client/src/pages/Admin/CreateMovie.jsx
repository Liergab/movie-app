import React, { useEffect, useState } from 'react'
import { useAllGenreQuery } from '../../services/redux/api/genre';
import { useCreateMovieMutation, useUploadImageMutation } from '../../services/redux/api/movie';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { toast } from "react-toastify";

const CreateMovie = () => {
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState({
        name: "",
        year: 0,
        detail: "",
        cast: [],
        rating: 0,
        image: null,
        genre: "",
      });
    console.log(movieData)
      const [selectedImage, setSelectedImage] = useState(null);
      const[createMovie,{isLoading:isLoadingCreate}] = useCreateMovieMutation()
      const[uploadImage, {isLoading:isLoadingUpload,  error: uploadImageErrorDetails}] = useUploadImageMutation()
      const {data:genres, isLoading:isLoadingGenre} = useAllGenreQuery()

      useEffect(() => {
        if (genres) {
          setMovieData((prevData) => ({
            ...prevData,
            genre: genres[0]?.id || "", // Set genre to the id of the first genre or an empty string
          }));
          console.log(genres[0]?._id);
        }
      }, [genres]);
    

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "genre") {
          const selectedGenre = genres.find((genre) => genre?.name === value);
    
          setMovieData((prevData) => ({
            ...prevData,
            genre: selectedGenre ? selectedGenre?._id : "",
          }));
        } else {
          setMovieData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
      };
      const handleCreateMovie = async () => {
        try {
          if (
            !movieData.name ||
            !movieData.year ||
            !movieData.detail ||
            !movieData.cast ||
            !selectedImage
          ) {
            toast.error("Please fill all required fields");
            return;
          }
    
          let uploadedImagePath = null;
    
          if (selectedImage) {
            const formData = new FormData();
            formData.append("image", selectedImage);
    
            const uploadImageResponse = await uploadImage(formData);
    
            if (uploadImageResponse.data) {
              uploadedImagePath = uploadImageResponse.data.image;
            } else {
              console.error("Failed to upload image: ", uploadImageErrorDetails);
              toast.error("Failed to upload image");
              return;
            }
    
            await createMovie({
              ...movieData,
              image: uploadedImagePath,
            }).unwrap();
            console.log(movieData)
            navigate("/admin/movies-list");
    
            setMovieData({
              name: "",
              year: 0,
              detail: "",
              cast: [],
              ratings: 0,
              image: null,
              genre: "",
            });
    
            toast.success("Movie Added To Database");
          }
        } catch (error) {
          console.error("Failed to create movie: ", error.data.message);
          toast.error(`Failed to create movie: ${error.data.message}`);
        }
      };
    

  return (
    <div className='bg-slate-900 w-full h-screen flex items-center justify-center'>
        <div className='bg-slate-950 w-full max-w-2xl h-auto rounded-md flex flex-col items-center justify-center px-4 py-8 space-y-10'>
       
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
                <select
                    name="genre"
                    // value={movieData.genre}
                    onChange={handleChange}
                    className="border border-slate-200 bg-slate-800 p-2 w-full max-w-xl rounded-md placeholder:text-slate-600 focus-within:text-slate-400"
                >
                    <option value="" disabled>
                        Select Year
                    </option>
                    {isLoadingGenre ? (
                        <option>Loading genres...</option>
                    ) : (
                        genres.map((genre) => (
                            <option key={`${genre?.id}-${genre?.name}`} value={genre?.id}>
                                {genre?.name}
                            </option>
                        ))
                     )}
                </select>
               
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


                <div className='w-full max-w-xl flex flex-row'>
                    <Button 
                       type="button"
                       onClick={handleCreateMovie}
                        variant='outlined'
                        disabled={isLoadingCreate || isLoadingUpload}
                    >
                          {isLoadingCreate || isLoadingUpload ? "Creating..." : "Create Movie"}
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateMovie
