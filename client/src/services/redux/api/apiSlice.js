import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// import { BASE_URL } from "../constant";

const customFetchFn = (url, options) => {
  return fetch(url, {
    ...options,
    credentials: 'include',
  });
};


// const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:  import.meta.env.VITE_REACT_APP_API_URL,
    fetchFn: customFetchFn,
  }),
  endpoints: () => ({}),
});