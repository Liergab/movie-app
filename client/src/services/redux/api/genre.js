import { GENRE_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const genreApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        createGenre:builder.mutation({
            query:(data) => ({
                url    : `${GENRE_URL}`,
                method : "POST",
                body   :  data
            }),
            invalidatesTags: ['GetAllGenre'],
        }),

        updateGenre:builder.mutation({
            query:({id,data}) => ({
                url    : `${GENRE_URL}/${id}`,
                method : "PUT",
                body   :  data
            }),
            invalidatesTags: ['GetAllGenre'],
        }),

        deleteGenre:builder.mutation({
            query:(id) => ({
                url    : `${GENRE_URL}/${id}`,
                method : "DELETE",
                
            }),
            invalidatesTags: ['GetAllGenre'],
        }),

        allGenrePagination:builder.query({
            query:(page) => ({
                url    : `${GENRE_URL}/pagination?page=${page}`,
                method : "GET",
            })
        }),
        allGenre:builder.query({
            query:() => ({
                url    : `${GENRE_URL}`,
                method : "GET",
            }),
            providesTags: ['GetAllGenre'],
        }),

        getByIdGenre:builder.query({
            query:(id) => ({
                url    : `${GENRE_URL}/${id}/individual`,
                method : "GET",
            })
        }),

    })
})

export const {  useCreateGenreMutation,
                useUpdateGenreMutation,
                useDeleteGenreMutation,
                useAllGenreQuery,
                useAllGenrePaginationQuery,
                useGetByIdGenreQuery   } = genreApiSlice