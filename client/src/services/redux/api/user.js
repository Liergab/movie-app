import { USERS_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const  userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        login: builder.mutation({
            query:(data) => ({
                url    : `${USERS_URL}/login`,
                method : "POST",
                body   : data
            })
        }),

        register: builder.mutation({
            query:(data) => ({
                url    : `${USERS_URL}`,
                method : "POST",
                body   :  data
            }),
            invalidatesTags: ['GetAllUsers'],
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
           
        }),

        getCurrentUser: builder.query({
            query : () => ({
                url    : `${USERS_URL}/profile`,
                method : "GET"
            })
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