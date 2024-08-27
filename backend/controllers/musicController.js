import asyncHandler from "express-async-handler";
import fs from "fs";
import util from "util";
const readir = util.promisify(fs.readdir);
const readFolder = async (path) => {
  const music = await readir(path);
  
  return music;
};

export const getArtists = asyncHandler(async (req, res) => {
  try {
    const artists = await readFolder(`${process.env.MUSIC_FOLDER}`);
    
    res.json(artists);
  } catch (e) {
    res.status(400);
    throw new Error("error while trying get music");
  }
});

export const albums = asyncHandler(async (req, res) => {
  try {
    const artistName = req.params.artist;
    const artist = await readFolder(`${process.env.MUSIC_FOLDER}/${artistName}`);
    res.json(artist);
  } catch (e) {
    res.status(400);
    throw new Error("error while trying get music");
  }
});

export const getSongsFromAlbum = asyncHandler(async (req, res) => {
    try {
    
      const artistName = req.params.artist;
      const album = req.params.album;

      const artist = await readFolder(`${process.env.MUSIC_FOLDER}/${artistName}/${album}`);
      res.json(artist);
    } catch (e) {
      res.status(400);
      console.log(e)
      throw new Error("error while trying get music");
    }
  });
