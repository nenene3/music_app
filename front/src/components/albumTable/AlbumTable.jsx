import React from "react";
import { useGetAlbumQuery } from "../../features/music/apiSlice";
import { useDispatch } from "react-redux";

import { addSong } from "../../features/musicQue/queSlice";
const Table = ({ artist, album }) => {
  const { data: songs, isLoading } = useGetAlbumQuery({
    artist: artist,
    album: album,
  });
  const dispatch = useDispatch();
  const addSongHandler = (song) => {
    dispatch(addSong({ artist, album, song }));
  };
  return (
    <div>
      <h1 className=" text-6xl text-center my-4">{album}</h1>
      <ul>
        {!isLoading
          ? songs.map((song, i) => {
              return (
                <li
                  key={i}
                  className="text-white text-3xl p-4 border border-red-400"
                  onClick={() => addSongHandler(song)}
                >
                  {i + 1 + " - " + song.lastIndexOf(".") === -1
                    ? song
                    : song.substring(0, song.lastIndexOf("."))}
                </li>
              );
            })
          : "loading"}
      </ul>
    </div>
  );
};

export default Table;
