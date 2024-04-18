import { MESSAGE_URL } from "../constant";
import { apiSlice } from "./apiSlice";


export const messageApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getUserMessageById:builder.query({
            query:(id) => ({
                url    : `${MESSAGE_URL}/${id}`,
                method : "GET"
            }),
            providesTags: ['GetUserMessage'],
        }),
        getConverstaionById:builder.query({
            query:(id) => ({
                url    : `${MESSAGE_URL}/conversation/${id}`,
                method : "GET"
            }),
            providesTags: ['GetIndividualConvo'],
        }),
        getConverstaionByTwo:builder.query({
            query:([currentId,user]) => ({
                url    : `${MESSAGE_URL}/conversation/find/${currentId}/${user}`,
                method : "GET"
            }),
            providesTags: ['GetConvoOfTwoUser'],
        }),
        createMessage:builder.mutation({
            query:(message) => ({
                url    : `${MESSAGE_URL}/create-message`,
                method : "POST",
                body   : message
            }),
            invalidatesTags: ['GetIndividualConvo','GetUserMessage,GetConvoOfTwoUser' ],
        })
    })
})

export const{ useGetUserMessageByIdQuery,
              useGetConverstaionByIdQuery,
              useCreateMessageMutation,
              useGetConverstaionByTwoQuery } = messageApiSlice