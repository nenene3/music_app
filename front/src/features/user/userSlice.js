import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            console.log(action.payload)
            state.userInfo=action.payload;
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
        logOut:(state)=>{
            state.userInfo=null;
            localStorage.removeItem('userInfo')
        }
    }
})

export const {setCredentials,logOut} = userSlice.actions

export default userSlice.reducer