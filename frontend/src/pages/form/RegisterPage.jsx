import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import "./style/registerPage.css";

import Navigation from "../../shared/layout/navigation/Navigation";
import { registerUser } from "../../redux/request/authRequest";

import { USER_REGEX, PSW_REGEX, EMAIL_REGEX } from "../../utils/regex";
import { OTPInput } from "../../components";

const RegisterPage = () => {
  const [otp, setOtp] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [isEnterOTP, setIsEnterOTP] = useState(false);
  const [userID, setUserID] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // AUTO FOCUS USER NAME INPUT
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  // CHECK VALID NAME
  useEffect(() => {
    const result = USER_REGEX.test(username);
    setValidName(result);
  }, [username]);

  // CHECK VALID EMAIL
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  // CHECK VALID PWD AND MATCH PWD
  useEffect(() => {
    const result = PSW_REGEX.test(pwd);
    setValidPwd(result);

    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  // DELETE ERR MSG WHEN USER CHANGE DATA INPUT
  useEffect(() => {
    setErrMsg("");
  }, [username, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if user put unknown input to hacking
    const v1 = USER_REGEX.test(username);
    const v2 = PSW_REGEX.test(pwd);

    if (!v1 || !v2) {
      return setErrMsg("Invalid Entry");
    }

    const newUser = {
      username: username,
      password: pwd,
      email: email,
    };
    setIsEnterOTP(true)

    registerUser(newUser, dispatch, navigate)
      .then((data) => {
        setVerifyCode(data?.otpCode)
        setUserID(data?.data._id)
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server response");
        } else {
          setErrMsg("Registration Failed");
        }
        errRef.current.focus();
      });
  };

  const renderUsernameInput = () => {
    return (
      <div className="register-form__input">
        <div>
          <label htmlFor="username">
            Username
            <span className={validName ? "valid" : "hide"}>😀</span>
            <span className={validName || !username ? "hide" : "invalid"}>
              😢
            </span>
          </label>
          <input
            required
            id="username"
            type="text"
            placeholder="username"
            ref={userRef}
            onChange={(e) => setUsername(e.target.value)}
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            autoComplete="off"
            value={username}
            className="border border-dark"
          />
          <p
            id="uidnote"
            className={
              userFocus && username && !validName
                ? "instructions animate__animated animate__bounceIn"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faCircleInfo} />
            4 to 24 characters. <br />
            Must begin with a letter. <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
        </div>
        <span></span>
      </div>
    );
  };

  const renderEmailInput = () => {
    return (
      <div className="register-form__input">
        <div>
          <label htmlFor="email">
            Email
            <span className={validEmail ? "valid" : "hide"}>😀</span>
            <span className={validEmail || !email ? "hide" : "invalid"}>
              😢
            </span>
          </label>
          <input
            required
            id="email"
            type="email"
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="emailnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            autoComplete="off"
            value={email}
            className="border border-dark"
          />
          <p
            id="emailnote"
            className={
              emailFocus && email && !validEmail
                ? "instructions animate__animated animate__bounceIn"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faCircleInfo} />
            Must be valid email
          </p>
        </div>
      </div>
    );
  };

  const renderPwdInput = () => {
    return (
      <div className="register-form__input">
        <div>
          <label htmlFor="password">
            Password
            <span className={validPwd ? "valid" : "hide"}>😀</span>
            <span className={validPwd || !pwd ? "hide" : "invalid"}>😢</span>
          </label>
          <input
            required
            id="password"
            type="password"
            placeholder="at least 5 characters"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            className="border border-dark"
          />
          <p
            id="pwdnote"
            className={
              pwdFocus && pwd && !validPwd
                ? "instructions animate__animated animate__bounceIn"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faCircleInfo} />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:
            <span aria-label="exclamation mark">!</span>
            <span aria-label="at symbol">@</span>
            <span aria-label="hashtag">#</span>
            <span aria-label="dollar sign">$</span>
            <span aria-label="percent">%</span>
          </p>
        </div>
        <span></span>
      </div>
    );
  };

  const renderRePwdInput = () => {
    return (
      <div className="register-form__input">
        <div>
          <label htmlFor="re-password">
            Re-Password
            <span className={validMatch && matchPwd ? "valid" : "hide"}>
              😀
            </span>
            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
              😢
            </span>
          </label>
          <input
            required
            id="re-password"
            type="password"
            minLength={5}
            placeholder="password"
            onChange={(e) => setMatchPwd(e.target.value)}
            aria-label={validMatch ? "false" : "true"}
            aira-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            className="border border-dark"
          />
          <p
            id="confirmnote"
            className={
              matchFocus && matchPwd && !validMatch
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faCircleInfo} />
            Must match the first password input field.
          </p>
        </div>
        <span></span>
      </div>
    );
  };

  const renderSubmitBtn = () => {
    return (
      <button
        role="button"
        type="submit"
        disabled={
          !validName || !validEmail || !validPwd || !validMatch ? true : false
        }
      >
        Register
      </button>
    );
  };

  const renderForm = () => {
    return (
      <>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        {isEnterOTP ? (
          <OTPInput otp={otp} onChangeOtp={setOtp} verifyCode={verifyCode} userID={userID} />
        ) : (
          <div className="register-form__container">
            <span className="register-form__title">Register</span>

            <div className="register-form__container-body">
              {renderUsernameInput()}
              {renderEmailInput()}
              {renderPwdInput()}
              {renderRePwdInput()}
              {renderSubmitBtn()}

              <div className="register-form__footer">
                <span className="me-3">Already have account?</span>
                <Link to="/login" className="fs-4">
                  Login now
                </Link>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <Navigation title="Login" link="/login" isSearch={false} />

      <div className="form-background animate__animated animate__fadeIn">
        <form
          id="register-form"
          onSubmit={handleSubmit}
          style={{
            display: "flex",
          }}
        >
          {renderForm()}
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
