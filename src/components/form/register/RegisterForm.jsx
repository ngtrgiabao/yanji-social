import React, { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./registerForm.css";

const RegisterForm = ({ active }) => {
    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const PSW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,}$/;
    const EMAIL_REGEX =
        /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
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
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user]);

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
    }, [user, pwd, matchPwd]);

    return (
        <>
            {active && (
                <div className="border form-background">
                    <form id="register-form">
                        <p
                            ref={errRef}
                            className={errMsg ? "errmsg" : "offscreen"}
                            aria-live="assertive"
                        >
                            {errMsg}
                        </p>
                        <div className="register-form__top">
                            <h1>Yanji Social</h1>
                            <span className="close">
                                <FontAwesomeIcon icon="fa-solid fa-xmark" />
                            </span>
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
                                                    validName ? "valid" : "hide"
                                                }
                                            >
                                                😀
                                            </span>
                                            <span
                                                className={
                                                    validName || !user
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
                                                setUser(e.target.value)
                                            }
                                            aria-invalid={
                                                validName ? "false" : "true"
                                            }
                                            aria-describedby="uidnote"
                                            onFocus={() => setUserFocus(true)}
                                            onBlur={() => setUserFocus(false)}
                                            autoComplete="off"
                                            value={user}
                                        />
                                        <p
                                            id="uidnote"
                                            className={
                                                userFocus && user && !validName
                                                    ? "instruction animate__animated animate__bounceIn"
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
                                                validEmail ? "false" : "true"
                                            }
                                            aria-describedby="emailnote"
                                            onFocus={() => setEmailFocus(true)}
                                            onBlur={() => setEmailFocus(false)}
                                            autoComplete="off"
                                            value={email}
                                        />
                                        <p
                                            id="emailnote"
                                            className={
                                                emailFocus && !validEmail
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
                                                    validPwd ? "valid" : "hide"
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
                                            onFocus={() => setPwdFocus(true)}
                                            onBlur={() => setPwdFocus(false)}
                                        />
                                        <p
                                            id="pwdnote"
                                            className={
                                                pwdFocus && !validPwd
                                                    ? "instructions animate__animated animate__bounceIn"
                                                    : "offscreen"
                                            }
                                        >
                                            <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                                            8 to 24 characters.
                                            <br />
                                            Must include uppercase and lowercase
                                            letters, a number and a special
                                            character.
                                            <br />
                                            Allowed special characters:
                                            <span aria-label="exclamation mark">
                                                !
                                            </span>
                                            <span aria-label="at symbol">
                                                @
                                            </span>
                                            <span aria-label="hashtag">#</span>
                                            <span aria-label="dollar sign">
                                                $
                                            </span>
                                            <span aria-label="percent">%</span>
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
                                                validMatch ? "false" : "true"
                                            }
                                            aira-describedby="confirmnote"
                                            onFocus={() => setMatchFocus(true)}
                                            onBlur={() => setMatchFocus(false)}
                                        />
                                        <p
                                            id="confirmnote"
                                            className={
                                                matchFocus && !validMatch
                                                    ? "instructions"
                                                    : "offscreen"
                                            }
                                        >
                                            <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                                            Must match the first password input
                                            field.
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
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default RegisterForm;
