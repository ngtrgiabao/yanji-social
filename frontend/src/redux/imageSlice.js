import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: "image",
  initialState: {
    image: {
      isFetching: false,
      error: false,
      success: false,
      currentImage: null,
    },
  },
  reducers: {
    sendImageStart: (state) => {
      state.image.isFetching = true;
    },
    sendImageSuccess: (state, action) => {
      state.image.isFetching = false;
      state.image.currentImage = action.payload;
      state.image.success = true;
    },
    sendImageFailed: (state) => {
      state.image.isFetching = false;
      state.image.error = true;
    },
    getImageStart: (state) => {
      state.image.isFetching = true;
    },
    getImageSuccess: (state, action) => {
      state.image.isFetching = false;
      state.image.currentImage = action.payload;
      state.image.error = true;
    },
    getImageFailed: (state) => {
      state.image.isFetching = false;
      state.image.error = true;
    },
  },
});

export const {
  sendImageStart,
  sendImageSuccess,
  sendImageFailed,
  getImageStart,
  getImageSuccess,
  getImageFailed,
} = imageSlice.actions;

export default imageSlice.reducer;
