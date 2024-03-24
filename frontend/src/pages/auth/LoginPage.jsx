import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";

import Navigation from "../../shared/layout/navigation/Navigation";
import { loginUser } from "../../redux/request/authRequest";
import { CAPTCHA_SITE_KEY } from "../../business/key";

import "./style/registerPage.css";

const LoginPage = () => {
  const pwd = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isVerifyCaptcha, setIsVerifyCaptcha] = useState(false);
  const [isError, setIsError] = useState(false);
  const [msgError, setMsgError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };

    loginUser(newUser, dispatch, navigate).then((data) => {
      if (!data) {
        setIsError(true);
        setMsgError("Invalid username or password. Please check again");
      } else if (data && data?.data.isVerifyEmail === false) {
        setIsError(true);
        setMsgError("Please verify your email to login");
      }
    });
  };

  const renderUsernameInput = () => {
    return (
      <div className="login-form__input">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          className="border border-dark"
          id="username"
        />
      </div>
    );
  };

  const showPwd = () => {
    if (pwd.current) {
      if (pwd.current.type === "password") {
        pwd.current.type = "text";
      } else {
        pwd.current.type = "password";
      }
    }
  };

  const renderPwdInput = () => {
    return (
      <div className="d-flex flex-column">
        <div className="login-form__input">
          <label htmlFor="pwd">Password</label>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border border-dark"
            ref={pwd}
            id="pwd"
          />
        </div>
        <div className="d-flex align-items-center">
          <input
            id="show-pwd"
            type="checkbox"
            onClick={showPwd}
            className="me-2"
          />
          <label htmlFor="show-pwd">Show Password</label>
        </div>

        {isError && (
          <p
            className={
              isError
                ? "instructions p-2 bg-danger animate__animated animate__bounceIn"
                : "offscreen"
            }
          >
            {msgError}
          </p>
        )}
      </div>
    );
  };

  const renderCaptcha = () => {
    return (
      <ReCAPTCHA
        sitekey={CAPTCHA_SITE_KEY}
        onClick={() => setIsVerifyCaptcha(true)}
        style={{
          width: "100%",
        }}
      />
    );
  };

  const renderSubmitBtn = () => {
    return (
      <button type="submit" disabled={!username || !password}>
        Sign in
      </button>
    );
  };

  return (
    <>
      <Navigation title="Register" link="/register" isSearch={false} />

      <div className="form-background animate__animated animate__fadeIn">
        <form id="login-form" onSubmit={handleLogin}>
          <div className="login-form__container">
            <span className="login-form__title">Login</span>
            <div className="login-form__container-body">
              {renderUsernameInput()}
              {renderPwdInput()}
              {renderCaptcha()}
              {renderSubmitBtn()}
              <div className="register-form__footer d-flex flex-column align-items-start">
                <Link to="/">Forgot your password?</Link>
                <span className="fs-6">
                  Not have account?
                  <Link to="/register" className="ms-2 fs-4">
                    Register
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
