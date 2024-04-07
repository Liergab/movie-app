import React from 'react'
import { useDeleteCommentMutation, useGetAllMoviesQuery } from '../../services/redux/api/movie'
import { formatMemberSince } from '../../hooks/FormDate'
import { toast } from 'react-toastify'

const AllComments = () => {
  const{data:movies, isLoading} = useGetAllMoviesQuery()
  const[deleteComment] = useDeleteCommentMutation()
  
  const  handleDeleteComment = async(movieId, reviewId) => {
    try {
        await deleteComment({
            movieId,
            reviewId
        })
        toast.success("Comment Deleted");
    } catch (error) {
        toast.error(error.data.message)
    }
  }
    
  return (
    <div className='mt-20 w-full  h-screen flex justify-center'>
       <h1>{isLoading && "Loading..." }</h1>
        <div className='w-full max-w-96 p-4'>
            <h1 className='text-2xl font-bold'>All Comments</h1>
            {movies?.map((m) => (
                <section
                key={m._id}
                className="flex flex-col justify-center items-center"
                >
                    
                {m?.reviews.map((review) => (
                    <div
                    key={review._id}
                    className="bg-slate-950 p-4 rounded-lg w-full max-w-xl mt-[2rem]"
                    >
                    <div className="flex justify-between">
                        <strong className="text-[#B0B0B0]">{review.name}</strong>
                        <p className="text-[#B0B0B0]">
                        {formatMemberSince(review?.createdAt)}
                        </p>
                    </div>

                    <p className="my-4">{review.comment}</p>

                    <button
                        className="text-red-500"
                        onClick={() => handleDeleteComment(m._id, review._id)}
                    >
                        Delete
                    </button>
                    </div>
                ))}
                </section>
            ))}
        </div>
    </div>
  )
}

export default AllComments
