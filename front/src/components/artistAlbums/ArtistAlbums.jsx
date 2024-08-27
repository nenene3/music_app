import React from "react";
import { useParams } from "react-router-dom";
import { useGetAlbumsQuery } from "../../features/music/apiSlice.js";
import Table from "../albumTable/AlbumTable.jsx";
const ArtistAlbums = () => {
  const { artist } = useParams();
  const { data,isLoading,isFetching } = useGetAlbumsQuery(artist);

  return (
    <div
      className="bg-slate-950 container mx-auto text-white overflow-auto h-[80svh]"
    >
      {!isFetching 
        ? data.map((album, i) => {
            return (
              <div key={i}>
                <Table artist={artist} album={album} />
              </div>
            );
          })
        : "a"}
    </div>
  );
};

export default ArtistAlbums;
