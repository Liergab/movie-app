import { USERS_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const  userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        login: builder.mutation({
            query:(data) => ({
                url    : `${USERS_URL}/login`,
                method : "POST",
                body   : data
            }),
            invalidatesTags: ['GetCurrentUser'],
        }),

        register: builder.mutation({
            query:(data) => ({
                url    : `${USERS_URL}`,
                method : "POST",
                body   :  data
            }),
            invalidatesTags: ['GetAllUsers','GetCurrentUser'],
        }),

        logout: builder.mutation({
            query: () => ({
                url    : `${USERS_URL}/logout`,
                method :  "POST",
            })
        }),

        profileUpdate: builder.mutation({
            query : (data) => ({
                url    : `${USERS_URL}`,
                method :  "PUT",
                body   :  data
            }),
            invalidatesTags: ['GetAllUsers','GetCurrentUser'],
        }),

        getCurrentUser: builder.query({
            query : () => ({
                url    : `${USERS_URL}/profile`,
                method : "GET"
            }),
            providesTags: ['GetCurrentUser',],
        }),

        getAllUser: builder.query({
            query : () => ({
                url    : USERS_URL,
                
            }),
            providesTags: ['GetAllUsers'],
        }),
    })
})

export const { useLoginMutation,
               useRegisterMutation, 
               useLogoutMutation,
               useProfileUpdateMutation,
               useGetCurrentUserQuery,
               useGetAllUserQuery } = userApiSlice;