import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addSong,
  removeSong,
  clearQue,
  addSongs,
  nextSong,
  prevSong,
  selectSong,
} from "../../features/musicQue/queSlice";
import Button from "../button";
const QueMusic = () => {
  
  const dispatch = useDispatch();
  const  que = useSelector((state) => state.musicQue.que);

  const removeSongHandler = (song) => {
    dispatch(removeSong(song));
  };
  const clearQueHandler = () => {
    dispatch(clearQue());
  };
 
  const selectHandler = (index) => {
    dispatch(selectSong(index));
  };

  return (
    <div className="h-[80svh] w-[40svh] relative text-white  bg-slate-900  overflow-auto border ">
      <div className="flex justify-between px-3">
      <h1 className="text-4xl  my-2"> que</h1>
      <h1 className="text-4xl  my-2" onClick={clearQueHandler}> x</h1>
      </div>
      <div className={`${'bg-slate-800'} text-white  text-2xl `}>
        <ol className="">
        {que.map((data,i)=><li key={i} className="border-2 text-3xl border-red-400" onClick={()=>{selectHandler(i)}}>{data.song}</li>)}
        </ol>
        
      </div>
    </div>
  );
};

export default QueMusic;
