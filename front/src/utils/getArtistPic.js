import axios from "axios";
export const getArtistPic = async (artist) => {
  const key = import.meta.env.VITE_LAST_FM_API_KEY;
  try {
    const response = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${key}&format=json`
    );
    return response.data.artist.image;
  } catch (e) {
    console.error(e)
    return null;
  }
};
