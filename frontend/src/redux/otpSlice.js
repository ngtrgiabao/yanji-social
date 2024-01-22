import { createSlice } from "@reduxjs/toolkit";

const optSlice = createSlice({
  name: "otp",
  initialState: {
    otp: {
      isFetching: false,
      error: false,
      success: false,
      otpCode: null,
    },
  },
  reducers: {
    getOtpStart: (state) => {
      state.otp.isFetching = true;
      state.otp.error = false;
      state.otp.success = false;
    },
    getOtpSuccess: (state, action) => {
      state.otp.isFetching = false;
      state.otp.otpCode = action.payload;
      state.otp.success = true;
    },
    getOtpFailed: (state) => {
      state.otp.isFetching = false;
      state.otp.error = true;
    },
  },
});

export const { getOtpStart, getOtpSuccess, getOtpFailed } = optSlice.actions;

export default optSlice.reducer;
