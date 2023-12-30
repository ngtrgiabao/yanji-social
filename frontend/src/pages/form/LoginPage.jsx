import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import Navigation from "../../layout/navigation/Navigation";
import { loginUser } from "../../redux/request/authRequest";

import "./style/registerPage.css";

function LoginPage() {
  const pwd = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

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
            Invalid username or password. Please check again
          </p>
        )}
      </div>
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
