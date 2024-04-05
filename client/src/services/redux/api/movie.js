import { MOVIE_URL, UPLOAD_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const movieApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        createMovie:builder.mutation({
            query:(newMovie) => ({
                url    : `${MOVIE_URL}/create-movie`,
                method : "POST",
                body   : newMovie
            }),
            invalidatesTags: ['GetAllMovies'],
        }),

        addReviewMovie:builder.mutation({
            query:({id, rating, comment}) => ({
                url    : `${MOVIE_URL}/${id}/reviews`,
                method : "POST",
                body   : {rating, id,comment}
            }),
            invalidatesTags: ['GetMovieById'],
        }),

        updateMovie: builder.mutation({
            query: ({ id, updatedMovie }) => ({
              url: `${MOVIE_URL}/update-movie/${id}`,
              method: "PUT",
              body: updatedMovie,
            }),
            invalidatesTags: ['GetAllMovies'],
          }),
          
          deleteComment: builder.mutation({
            query: ({ movieId, reviewId }) => ({
              url: `${MOVIE_URL}/delete-comment`,
              method: "DELETE",
              body: { movieId, reviewId },
            }),
            invalidatesTags: ['GetAllMovies'],
          }),   

          deleteMovie: builder.mutation({
            query: (id) => ({
              url: `${MOVIE_URL}/delete-movie/${id}`,
              method: "DELETE",
            }),
            invalidatesTags: ['GetAllMovies'],
          }),

          getSpecificMovie: builder.query({
            query: (id) => `${MOVIE_URL}/specific-movie/${id}`,
            providesTags: ['GetMovieById'],
          }),

          getNewMovies: builder.query({
            query: () => `${MOVIE_URL}/new-movies`,
          }),
      
          getTopMovies: builder.query({
            query: () => `${MOVIE_URL}/top-movies`,
          }),
      
          getRandomMovies: builder.query({
            query: () => `${MOVIE_URL}/random-movies`,
          }),

          getAllMovies: builder.query({
            query: () => `${MOVIE_URL}/all-movies`,
            providesTags: ['GetAllMovies'],
          }),

          uploadImage: builder.mutation({
            query: (formData) => ({
              url: `${UPLOAD_URL}`,
              method: "POST",
              body: formData,
            })
          }),
    })
})

export const {
            useCreateMovieMutation,
            useAddReviewMovieMutation,
            useUpdateMovieMutation,
            useDeleteCommentMutation,
            useDeleteMovieMutation,
            useGetAllMoviesQuery,
            // 
            useGetSpecificMovieQuery,
            useGetNewMoviesQuery,
            useGetTopMoviesQuery,
            useGetRandomMoviesQuery,
            useUploadImageMutation } = movieApiSlice