import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as mm from "music-metadata";
import {
  toggleSong,
  nextSong,
  prevSong,
} from "../../features/musicQue/queSlice";
import Button from "../button/Button";
import axios from "axios";

const MusicPlayer = ({ className }) => {
  const songRef = useRef();
  const { isPlaying, que, index } = useSelector((state) => state.musicQue);
  const dispatch = useDispatch();

  const [cover, setCover] = useState(null);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = songRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    songRef.current.volume = newVolume;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(songRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(songRef.current.duration);
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    songRef.current.currentTime = time;
  };

  const toggleMusicHandler = () => {
    const toggleStatus = isPlaying;
    if (toggleStatus) {
      songRef.current.pause();
    } else {
      songRef.current.play();
    }
    dispatch(toggleSong());
  };

  const extractMetadata = async (mp3Url) => {
    if (cover) {
      URL.revokeObjectURL(cover);
    }
    console.log(mp3Url);
    try {
      const response = await axios.get(mp3Url, {
        responseType: "arraybuffer",
        withCredentials: true,
      });
      const uint8Array = new Uint8Array(response.data);
      const metadata = await mm.parseBuffer(
        uint8Array,
        `${mp3Url.endsWith(".flac") ? "audio/flac" : "audio/mpeg"}`
      );
      console.log(metadata);
      setTitle(metadata.common.title);
      setArtist(metadata.common.artist);
      setDuration(metadata.format.duration);
      // setTitle(metadata.common.duration)
      const picture = metadata.common.picture[0];

      if (picture) {
        const blob = new Blob([picture.data], { type: picture.format });
        const imageUrl = URL.createObjectURL(blob);
        setCover(imageUrl);
      } else {
        setCover(null);
      }
    } catch (err) {
      console.error("Error:", err);
      setCover(null);
    }
  };

  useEffect(() => {
    if ((!songRef.current.src && que.length !== 0) || songRef?.current?.src ==='http://localhost:5173/music/gf' ) {
      songRef.current.src = `http://localhost:3000/static/${que[index].artist}/${que[index].album}/${que[index].song}`;
      songRef.current.play();
      dispatch(toggleSong())
      extractMetadata(songRef.current.src);
    }
    if(songRef.current.src && que.length===0){
      songRef.current.pause();
      songRef.current.src='gf';
      setTitle('');
      setArtist('');
      setDuration('');
      setCover(null)
      if(isPlaying)
        dispatch(toggleSong())      
    }
    console.log(songRef.current.src)

  }, [que]);

  useEffect(() => {
    if (songRef.current && que.length !== 0) {
      const src = `http://localhost:3000/static/${que[index].artist}/${que[index].album}/${que[index].song}`;

      //old song

      extractMetadata(src);

      songRef.current.src = src;
      songRef.current.currentTime = 0;

      console.log(isPlaying)
      if (isPlaying) 
        songRef.current.play();
    }
  }, [index]);

  const playNextHandler = () => {
    dispatch(nextSong());
  };
  const playPrevHandler = () => {
    dispatch(prevSong());
  };
  return (
    <div
      className={`bg-slate-900 border border-white h-[20svh] flex items-center justify-center text-white `}
    >
      <div className="flex items-center gap-4 justify-center">
        <img
          src={
            cover
              ? cover
              : "data:image/png;base64,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"
          }
          title="cover"
          className=" w-[100px] h-[100px]"
        />
        <audio
          ref={songRef}
          onEnded={playNextHandler}
          type={`${
            songRef?.current?.src?.endsWith(".flac")
              ? "audio/flac"
              : "audio/mpeg"
          }`}
        ></audio>
        <Button onClick={toggleMusicHandler}>
          {isPlaying ? "stop" : "play"}
        </Button>
        <h1 className="text-white">
          {artist} - {title}
        </h1>
        <Button onClick={playPrevHandler}>prev</Button>
        {calculateTime(currentTime)}
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          step={0.1}
        />
        {calculateTime(duration)}
        <Button onClick={playNextHandler}>next</Button>
        <input
          id="volume"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      <Button onClick={() => console.log(isPlaying)}>console,</Button>
    </div>
  );
};

export default MusicPlayer;
