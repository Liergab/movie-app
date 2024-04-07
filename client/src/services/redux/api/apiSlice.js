import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const customFetchFn = (url, options) => {
  return fetch(url, {
    ...options,
    credentials: 'include',
  });
};

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    fetchFn: customFetchFn,
  }),
  endpoints: () => ({}),
});