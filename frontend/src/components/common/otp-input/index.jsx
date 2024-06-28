import { memo, useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import isEqual from "react-fast-compare";

import { updateUser } from "../../../redux/request/userRequest";
import { resendOtp } from "../../../redux/request/otpRequest";
import { RouteNames } from "../../../constant/routes";
import { LocalStorageKeys } from "../../../constant/local-storage-key";

const OTPInput = ({
  otp = "",
  onChangeOtp = () => {},
  verifyCode = "",
  userID = "",
  onSetVerifyCode,
}) => {
  const [errMsg, setErrMsg] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [seconds, setSeconds] = useState(
    parseInt(localStorage.getItem(LocalStorageKeys.REMAINING_SECONDS)) || 10,
  );
  const [newOtp, setNewOtp] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentTime = Date.now();

  const InputStyle = {
    width: "6rem",
    height: "6rem",
    margin: "1rem",
    fontSize: "3rem",
    borderRadius: "5px",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "var(--color-primary)",
  };

  const ContainerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  };

  const countDown = () => {
    setSeconds((prevSeconds) => {
      const newSeconds = prevSeconds - 1;
      localStorage.setItem(
        LocalStorageKeys.REMAINING_SECONDS,
        newSeconds.toString(),
      );
      return newSeconds;
    });
  };

  useEffect(() => {
    const interval =
      seconds > 0 &&
      setInterval(() => {
        countDown();
      }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const handleUpdateUser = () => {
    const updatedUser = {
      userID,
      isVerifyEmail: true,
    };

    updateUser(updatedUser, dispatch).then(() => {
      setIsLoading(false);
      alert("Success");
      navigate(RouteNames.LOGIN);
    });
  };

  const handleSubmit = () => {
    if (newOtp) {
      if (verifyCode && verifyCode === newOtp.otpCode) {
        setIsErr(false);
        setIsLoading(true);
        handleUpdateUser();

        if (newOtp.expirationTime < currentTime) {
          setErrMsg("Invalid OTP Code");
          setIsErr(true);
        }

        setIsLoading(false);
      } else if (verifyCode === otp) {
        setErrMsg("Invalid OTP Code");
        setIsErr(true);
      }
    } else if (verifyCode && otp && verifyCode === otp) {
      setIsErr(false);
      setIsLoading(true);
      handleUpdateUser();
    } else {
      if (
        (verifyCode !== "" && otp && verifyCode !== otp) ||
        newOtp.otpCode !== verifyCode
      ) {
        setErrMsg("Invalid OTP Code");
        setIsErr(true);
      }
    }
  };

  const handleResendOtp = async () => {
    if (seconds > 0) return;

    const data = await resendOtp(dispatch);
    setNewOtp({ ...data });
    alert(`Your new OTP code is: ${data.otpCode}`);
    setSeconds(10);
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <h2 className="fs-1 fw-bold">Enter Your OTP</h2>
        <div>
          <OtpInput
            value={otp.toUpperCase()}
            onChange={(value) => {
              onChangeOtp(value.toUpperCase());
              onSetVerifyCode(value.toUpperCase());
            }}
            numInputs={4}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            containerStyle={ContainerStyle}
            inputStyle={InputStyle}
          />
          <div
            className="fs-5 bg-transparent border-0"
            style={{
              marginLeft: "1rem",
              color: "var(--color-primary)",
              fontWeight: `${seconds > 0 ? "normal" : "bold"}`,
              cursor: `${seconds > 0 ? "not-allowed" : "pointer"}`,
            }}
            onClick={handleResendOtp}
            disabled={seconds > 0}
          >
            Re-send OTP Code {seconds > 0 && `in ${seconds}`}{" "}
          </div>
        </div>
        {isErr && <span className="text-danger">{errMsg}</span>}
        <div
          className="py-3 px-5 mt-2 border-0 text-white"
          style={{
            outline: "none",
            backgroundColor: "var(--color-primary)",
            opacity: `${otp.length < 4 || !otp ? "0.5" : "1"}`,
            borderRadius: "0.5rem",
            cursor: `${otp.length < 4 || !otp ? "not-allowed" : "pointer"}`,
          }}
          onClick={handleSubmit}
          disabled={otp.length < 4 || !otp ? true : false}
        >
          {isLoading ? "Loading..." : "Verify"}
        </div>
        <span className="mt-2 fw-lighter">
          Please check your email to get OTP code
        </span>
        <span className="fs-5 fw-bold mt-2 text-center">
          Thank you for your register at Yanji Social 🥰 !
        </span>
      </div>
    </>
  );
};

export default memo(OTPInput, isEqual);
