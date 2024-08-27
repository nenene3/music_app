import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
const initialState = { que: [], index: 0, isPlaying: false, duration: 0 };

const queSlice = createSlice({
  name: "musicQue",
  initialState,
  reducers: {
    addSong: (state, action) => {
      if (action.payload) state.que.push(action.payload);
    },
    removeSong: (state, action) => {
      const index = state.que.indexOf(action.payload);
      if (index !== -1) {
        console.log(index);
        state.que.splice(index, 1);
      }
    },
    clearQue: () => {
      return { que: [], index: 0, isPlaying: false, duration: 0 };
    },
    addSongs: (state, action) => {
      state.que.push(...action.payload);
    },
    nextSong: (state) => {
      if (state.que.length !== 0) {
        state.index = (state.index + 1) % state.que.length;
      }
    },
    prevSong: (state) => {
      if (state.index != 0) {
        state.index = state.index - 1;
      }
    },
    selectSong: (state, action) => {
      const index = action.payload;
      if (!isNaN(index) && index < state.que.length && 0 <= index) {
        state.index = index;
      } else {
        console.log("i");
      }
    },
    toggleSong: (state) => {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const {
  addSong,
  removeSong,
  clearQue,
  addSongs,
  prevSong,
  nextSong,
  selectSong,
  toggleSong,
} = queSlice.actions;

export default queSlice.reducer;
