import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  useLogoutMutation,
} from "../../features/user/apislice";
import { useSelector,useDispatch } from "react-redux";
import { setCredentials } from "../../features/user/userSlice"; 
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const [logOut] = useLogoutMutation();
  
  const user = useSelector((state)=>state.user.userInfo) 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ email, password });
      if(user.data){
        dispatch(setCredentials(user.data))
      }
      console.log(user);

    } catch (e) {
      console.log(e);
    }
  };

  const userObserver =()=>{
    if(user !==null){
      navigate('/')
    }
    console.log(user)
  }

  useEffect(()=>{
    userObserver()
  },[user])
  
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={formHandler}
        className="h-[400px] border-2 border-black p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none  
   focus:border-blue-500"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold  
   py-2 px-4 rounded"
          >
           login
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default Login;
