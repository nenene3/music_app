import React from 'react'

import CardSideBar from '../cardSideBar'

const MusicSideBar = ({music}) => {

  return (
    <div className="h-[80svh] top-0 left-0  bg-gray-800  w-96 flex flex-col  p-4 overflow-auto text-white gap-4">
        {music.map((artist, i) => (
          <div key={i}>
            <CardSideBar artist={artist}/>
          </div>
        ))}
      </div>
  )
}

export default MusicSideBar