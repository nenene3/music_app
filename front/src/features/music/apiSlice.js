import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "musicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/music",
  }),
  endpoints: (builder) => ({
    getAlbums: builder.query({
      query: (artist) => ({
        url: `/${artist}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAlbum:builder.query({
        query:(data)=>({
            url:`/${data.artist}/${data.album}`,
            method:'GET',
            credentials:'include'
        })
    })
  }),
});

export const { useGetAlbumsQuery,useGetAlbumQuery } = apiSlice;

export default apiSlice