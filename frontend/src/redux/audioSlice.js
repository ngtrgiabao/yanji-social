import { createSlice } from "@reduxjs/toolkit";

const audioSlice = createSlice({
  name: "audio",
  initialState: {
    audio: {
      isFetching: false,
      error: false,
      success: false,
      currentAudio: null,
    },
  },
  reducers: {
    sendAudioStart: (state) => {
      state.audio.isFetching = true;
    },
    sendAudioSuccess: (state, action) => {
      state.audio.isFetching = false;
      state.audio.currentAudio = action.payload;
      state.audio.success = true;
    },
    sendAudioFailed: (state) => {
      state.audio.isFetching = false;
      state.audio.error = true;
    },
    getAudioStart: (state) => {
      state.audio.isFetching = true;
    },
    getAudioSuccess: (state, action) => {
      state.audio.isFetching = false;
      state.audio.currentAudio = action.payload;
      state.audio.error = true;
    },
    getAudioFailed: (state) => {
      state.audio.isFetching = false;
      state.audio.error = true;
    },
  },
});

export const {
  sendAudioStart,
  sendAudioSuccess,
  sendAudioFailed,
  getAudioStart,
  getAudioSuccess,
  getAudioFailed,
} = audioSlice.actions;

export default audioSlice.reducer;
