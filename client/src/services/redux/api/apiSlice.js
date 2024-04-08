import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constant";

const customFetchFn = (url, options) => {
  return fetch(url, {
    ...options,
    credentials: 'include',
  });
};

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:BASE_URL,
    fetchFn: customFetchFn,
  }),
  endpoints: () => ({}),
});