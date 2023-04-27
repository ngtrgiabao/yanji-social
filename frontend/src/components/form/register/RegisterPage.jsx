import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./registerPage.css";

import Navigation from "../../navigation/Navigation";
import { registerUser } from "../../../redux/apiRequest";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const PSW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,}$/;
    const EMAIL_REGEX =
        /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;

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
        userRef.current && userRef.current.focus();
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

        registerUser(newUser, dispatch, navigate)
            .then(() => {
                setSuccess(true);
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

    return (
        <>
            <Navigation title="Login" link="/login" />

            <div className="form-background animate__animated animate__fadeIn">
                <form
                    id="register-form"
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        justifyContent: `${
                            success ? "center" : "space-between"
                        }`,
                    }}
                >
                    {success ? (
                        <section>
                            <h1>REGISTER SUCCESS 😃🎉🎉</h1>
                            <p>
                                You can login now [<strong>{username}</strong>]
                                😎
                            </p>
                            <u>
                                <Link to="/login">Login now</Link>
                            </u>
                        </section>
                    ) : (
                        <>
                            <p
                                ref={errRef}
                                className={errMsg ? "errmsg" : "offscreen"}
                                aria-live="assertive"
                            >
                                {errMsg}
                            </p>
                            <div className="register-form__top">
                                <h1>Yanji Social</h1>
                            </div>
                            <div className="register-form__container">
                                <div className="register-form__title">
                                    <span>Sign Up</span>
                                </div>

                                <div className="register-form__container-body">
                                    {/* USERNAME */}
                                    <div className="register-form__input">
                                        <div>
                                            <label htmlFor="username">
                                                Username
                                                <span
                                                    className={
                                                        validName
                                                            ? "valid"
                                                            : "hide"
                                                    }
                                                >
                                                    😀
                                                </span>
                                                <span
                                                    className={
                                                        validName || !username
                                                            ? "hide"
                                                            : "invalid"
                                                    }
                                                >
                                                    😢
                                                </span>
                                            </label>
                                            <input
                                                required
                                                id="username"
                                                type="text"
                                                placeholder="username"
                                                ref={userRef}
                                                onChange={(e) =>
                                                    setUsername(e.target.value)
                                                }
                                                aria-invalid={
                                                    validName ? "false" : "true"
                                                }
                                                aria-describedby="uidnote"
                                                onFocus={() =>
                                                    setUserFocus(true)
                                                }
                                                onBlur={() =>
                                                    setUserFocus(false)
                                                }
                                                autoComplete="off"
                                                value={username}
                                            />
                                            <p
                                                id="uidnote"
                                                className={
                                                    userFocus &&
                                                    username &&
                                                    !validName
                                                        ? "instructions animate__animated animate__bounceIn"
                                                        : "offscreen"
                                                }
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                                                4 to 24 characters. <br />
                                                Must begin with a letter. <br />
                                                Letters, numbers, underscores,
                                                hyphens allowed.
                                            </p>
                                        </div>
                                        <span></span>
                                    </div>

                                    {/* EMAIL */}
                                    <div className="register-form__input">
                                        <div>
                                            <label htmlFor="email">
                                                Email
                                                <span
                                                    className={
                                                        validEmail
                                                            ? "valid"
                                                            : "hide"
                                                    }
                                                >
                                                    😀
                                                </span>
                                                <span
                                                    className={
                                                        validEmail || !email
                                                            ? "hide"
                                                            : "invalid"
                                                    }
                                                >
                                                    😢
                                                </span>
                                            </label>
                                            <input
                                                required
                                                id="email"
                                                type="email"
                                                placeholder="example@gmail.com"
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                aria-invalid={
                                                    validEmail
                                                        ? "false"
                                                        : "true"
                                                }
                                                aria-describedby="emailnote"
                                                onFocus={() =>
                                                    setEmailFocus(true)
                                                }
                                                onBlur={() =>
                                                    setEmailFocus(false)
                                                }
                                                autoComplete="off"
                                                value={email}
                                            />
                                            <p
                                                id="emailnote"
                                                className={
                                                    emailFocus &&
                                                    email &&
                                                    !validEmail
                                                        ? "instruction animate__animated animate__bounceIn"
                                                        : "offscreen"
                                                }
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                                                Must be valid email
                                            </p>
                                        </div>
                                    </div>

                                    {/* PWD */}
                                    <div className="register-form__input">
                                        <div>
                                            <label htmlFor="password">
                                                Password
                                                <span
                                                    className={
                                                        validPwd
                                                            ? "valid"
                                                            : "hide"
                                                    }
                                                >
                                                    😀
                                                </span>
                                                <span
                                                    className={
                                                        validPwd || !pwd
                                                            ? "hide"
                                                            : "invalid"
                                                    }
                                                >
                                                    😢
                                                </span>
                                            </label>
                                            <input
                                                required
                                                id="password"
                                                type="password"
                                                placeholder="at least 5 characters"
                                                onChange={(e) =>
                                                    setPwd(e.target.value)
                                                }
                                                value={pwd}
                                                aria-invalid={
                                                    validPwd ? "false" : "true"
                                                }
                                                aria-describedby="pwdnote"
                                                onFocus={() =>
                                                    setPwdFocus(true)
                                                }
                                                onBlur={() =>
                                                    setPwdFocus(false)
                                                }
                                            />
                                            <p
                                                id="pwdnote"
                                                className={
                                                    pwdFocus && pwd && !validPwd
                                                        ? "instructions animate__animated animate__bounceIn"
                                                        : "offscreen"
                                                }
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                                                8 to 24 characters.
                                                <br />
                                                Must include uppercase and
                                                lowercase letters, a number and
                                                a special character.
                                                <br />
                                                Allowed special characters:
                                                <span aria-label="exclamation mark">
                                                    !
                                                </span>
                                                <span aria-label="at symbol">
                                                    @
                                                </span>
                                                <span aria-label="hashtag">
                                                    #
                                                </span>
                                                <span aria-label="dollar sign">
                                                    $
                                                </span>
                                                <span aria-label="percent">
                                                    %
                                                </span>
                                            </p>
                                        </div>
                                        <span></span>
                                    </div>

                                    {/* Re-PWD */}
                                    <div className="register-form__input">
                                        <div>
                                            <label htmlFor="re-password">
                                                Re-Password
                                                <span
                                                    className={
                                                        validMatch && matchPwd
                                                            ? "valid"
                                                            : "hide"
                                                    }
                                                >
                                                    😀
                                                </span>
                                                <span
                                                    className={
                                                        validMatch || !matchPwd
                                                            ? "hide"
                                                            : "invalid"
                                                    }
                                                >
                                                    😢
                                                </span>
                                            </label>
                                            <input
                                                required
                                                id="re-password"
                                                type="password"
                                                minLength={5}
                                                placeholder="password"
                                                onChange={(e) =>
                                                    setMatchPwd(e.target.value)
                                                }
                                                aria-label={
                                                    validMatch
                                                        ? "false"
                                                        : "true"
                                                }
                                                aira-describedby="confirmnote"
                                                onFocus={() =>
                                                    setMatchFocus(true)
                                                }
                                                onBlur={() =>
                                                    setMatchFocus(false)
                                                }
                                            />
                                            <p
                                                id="confirmnote"
                                                className={
                                                    matchFocus &&
                                                    matchPwd &&
                                                    !validMatch
                                                        ? "instructions"
                                                        : "offscreen"
                                                }
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                                                Must match the first password
                                                input field.
                                            </p>
                                        </div>
                                        <span></span>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={
                                            !validName ||
                                            !validEmail ||
                                            !validPwd ||
                                            !validMatch
                                                ? true
                                                : false
                                        }
                                    >
                                        Register
                                    </button>

                                    <div className="register-form__footer">
                                        <p>Already have account?</p>
                                        <Link to="/login">Login now</Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </>
    );
};

export default RegisterPage;
