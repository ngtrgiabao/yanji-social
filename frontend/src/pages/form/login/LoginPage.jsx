import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import Navigation from "../../../layout/navigation/Navigation";
import { loginUser } from "../../../redux/request/authRequest";

import "../../../style/pages/form/register/registerPage.css";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            password: password,
        };

        loginUser(newUser, dispatch, navigate);
    };

    const renderUsernameInput = () => {
        return (
            <div className="login-form__input">
                <label htmlFor="">Username</label>
                <input
                    type="text"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
        );
    };

    const renderPwdInput = () => {
        return (
            <div className="login-form__input">
                <label htmlFor="">Password</label>
                <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
        );
    };

    const renderSubmitBtn = () => {
        return (
            <button role="button" type="submit">
                Sign in
            </button>
        );
    };

    return (
        <>
            <Navigation title="Register" link="/register" />

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
