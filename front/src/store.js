import {configureStore} from '@reduxjs/toolkit' 
import userReducer from './features/user/userSlice.js'
import apiSlice from './features/user/apislice.js'
import queReducer from './features/musicQue/queSlice.js'
import musicApi from './features/music/apiSlice.js'
export const store = configureStore({
    reducer:{
        user:userReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
        musicQue:queReducer,
        [musicApi.reducerPath]:musicApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware).concat(musicApi.middleware),
})
