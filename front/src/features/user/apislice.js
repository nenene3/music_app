import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const apiSlice = createApi({
    reducerPath:'userApi',
    tagTypes:['users'],
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3000/'}),
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(user)=>({
                url:'users/login',
                method:'POST',
                body:user,
                credentials:'include'
            }),
        }),
        logout:builder.mutation({
            query:(user)=>({
                url:'users/logout',
                method:'POST',
                credentials:'include'
            }),
        }),
        getMusic:builder.query({
            query:()=>({
                url:'music/',
                method:'GET',
                credentials:'include'
            }),
        }),
    })
})

export const {useLoginMutation,useLogoutMutation,useGetMusicQuery} = apiSlice

export default apiSlice