import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getArtistPic } from "../../utils/getArtistPic";
const CardSideBar = ({ artist }) => {
  const [artistPic, setArtistPic] = useState(null);

  const init = async()=>{
    try{
       const images = await getArtistPic(artist)
       setArtistPic(images[1])
    }catch(e){
      
      setArtistPic(null)
    }
  }

  useEffect(() => {
    // init()
  }, []);

  return (
    <Link
      className="flex  border-white px-2 items-center justify-between "
      to={`/music/${artist}`}
    >
      <img src={artistPic ? artistPic['#text'] : "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png"} alt="artist img" />
      <p>{artist}</p>
    </Link>
  );
};

export default CardSideBar;
