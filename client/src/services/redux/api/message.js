import { MESSAGE_URL } from "../constant";
import { apiSlice } from "./apiSlice";


export const messageApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getUserMessageById:builder.query({
            query:(id) => ({
                url    : `${MESSAGE_URL}/${id}`,
                method : "GET"
            })
        }),
        getConverstaionById:builder.query({
            query:(id) => ({
                url    : `${MESSAGE_URL}/conversation/${id}`,
                method : "GET"
            })
        })
    })
})

export const{ useGetUserMessageByIdQuery,
              useGetConverstaionByIdQuery } = messageApiSlice