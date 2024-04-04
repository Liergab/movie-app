import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useAddReviewMovieMutation, useGetSpecificMovieQuery } from '../../services/redux/api/movie'
import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
const MovieDetails = () => {
    const {userInfo} = useSelector((state) => state.auth)
  
    const{id} = useParams()
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const{data:movie, refetch} = useGetSpecificMovieQuery(id)
    const [ addReviewMovie ] = useAddReviewMovieMutation()

    const handleSubmit = async() => {
        try {
             await addReviewMovie({
                id,
                rating,
                comment
            }).unwrap()
            refetch()

            toast.success('Review created successfully')
        } catch (error) {
            toast.error(error.data.message)
        }
    }
  

  return (
    <div className='mt-20 flex flex-col items-center justify-center gap-20'>
        <div className='w-full max-w-4xl flex flex-col items-center justify-center space-y-8  bg-slate-950 p-8 rounded-lg'>
            <div className='flex items-center justify-center'>
                <img src={`http://localhost:5005/images/${movie?.image}`} alt={movie?.name} className='w-full max-w-4xl rounded-sm' />
            </div>
            <div className='w-full max-w-4xl flex flex-col items-start justify-center space-y-10'>
                <div className='flex flex-col space-y-5'>
                    <p className='text-5xl font-bold'>{movie?.name}</p>
                    <p className='text-xl font-bold'>{movie?.detail}</p>
                </div>
                <div>
                    <p className='text-xl font-bold '>Cast: {movie?.cast}</p> <br />
                </div>
            </div>
        </div>
        <section className='w-full flex items-center justify-center mb-20'>
            {userInfo ? (
            <form action="" className='w-full max-w-4xl flex flex-col items-start justify-center gap-4'>
                <label htmlFor="comment" className="block text-xl mb-2 ">
                    Write Your Review
                </label>
               
                <textarea 
                   id="comment"
                   placeholder='Write Review'
                   value={comment} rows="3" 
                   onChange={(e) => setComment(e.target.value)} 
                   className="border border-slate-200 bg-slate-800 p-2 w-full max-w-4xl rounded-md placeholder:text-slate-600 focus-within:text-slate-400 resize-none overflow-hidden"
                   style={{ resize: "vertical", minHeight: "2rem", maxHeight: "12rem" }}
                >
                </textarea>

                <label htmlFor="rating" className="block text-xl mb-2 ">
                    Write Your Review
                </label>
                <input 
                    id='rating'
                    type="number"
                    placeholder='Rating'
                    className='border border-slate-200 bg-slate-800 p-2 w-full max-w-4xl rounded-md placeholder:text-slate-600 focus-within:text-slate-400'
                    onChange={(e) => setRating(e.target.value)} 
                />
                <Button variant='outlined' color='primary' onClick={handleSubmit }>
                    Submit
                </Button>
            </form> 

            ):(
                <p>
                Please <Link to="/login">Sign In</Link> to write a review
              </p>
            )}
        </section>
        <section className='mb-20 w-full flex  max-w-4xl' >

            <h1>{movie?.reviews.length === 0 && "No Reviews"}</h1>

            <div className='flex flex-wrap  w-full gap-1'>
                {movie?.reviews.map((review) => (
                    <div key={review?._id} className='w-full flex flex-wrap items-center justify-center bg-gray-950 p-4 rounded-md'>
                        <div>
                            <strong className="text-[#B0B0B0]">{review.name}</strong>
                            <p className="text-[#B0B0B0]">
                                {review.createdAt.substring(0, 10)}
                            </p>
                            <p className="my-4">{review.comment}</p>

                        </div>
                    </div>
                ))}
          </div>
        </section>
    </div>
  )
}

export default MovieDetails
