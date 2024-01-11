import { useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { updateUser } from "../../redux/request/userRequest";

const OTPInput = ({ otp, onChangeOtp = () => { }, verifyCode, userID }) => {
  const [errMsg, setErrMsg] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleSubmit = () => {
    if (verifyCode === otp) {
      setIsErr(false);
      setIsLoading(true);

      updateUser({ userID, isVerifyEmail: true }, dispatch).then(() => {
        setIsLoading(false);
        alert("Success");
        navigate("/login");
      });

      setIsLoading(false);
    } else {
      setErrMsg("Invalid OTP Code");
      setIsErr(true);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="fs-1 fw-bold">Enter Your OTP</h2>
      <OtpInput
        value={otp.toUpperCase()}
        onChange={(value) => onChangeOtp(value.toUpperCase())}
        numInputs={4}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
        containerStyle={ContainerStyle}
        inputStyle={InputStyle}
      />
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
  );
};

export default OTPInput;
