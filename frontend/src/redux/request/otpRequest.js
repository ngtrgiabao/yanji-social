import otpService from "../../services/otp.service";
import { getOtpStart, getOtpSuccess, getOtpFailed } from "../otpSlice";

export const resendOtp = async (dispatch) => {
  dispatch(getOtpStart());
  try {
    const res = await otpService.resendOtp();
    dispatch(getOtpSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getOtpFailed());
  }
};
