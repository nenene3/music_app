import React, { useEffect, useState } from "react";
import { useGetMusicQuery } from "../../features/user/apislice";
import { Link, Outlet } from "react-router-dom";
import MusicSideBar from "../musicSidebar";
import MusicPlayer from "../musicPlayer";
import { useSelector } from "react-redux";
import PrivateRoute from "../PrivateRoute";
import QueMusic from "../queMusic";
const Music = () => {
  const { data: music, error, isloading } = useGetMusicQuery();
  const { que } = useSelector((state) => state.musicQue);
  return (
      <div className=" bg-slate-700">
        <div className={`${error ? "hidden" : ""} `}>
          <div className="flex ">
            {music ? <MusicSideBar music={music} /> : "a"}
            <div className="flex w-[75svh] mx-auto">
            <Outlet />
            </div>
            <QueMusic/>
          </div>
          <MusicPlayer className={``} />
        </div>
        <div
          className={`${
            !error ? "hidden" : ""
          } text-white  flex items-center justify-center  text-7xl `}
        >
          no music found
        </div>
      </div>
  );
};

export default Music;
