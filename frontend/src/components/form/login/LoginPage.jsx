import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import Navigation from "../../navigation/Navigation";
import { loginUser } from "../../../redux/apiRequest";

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

    return (
        <>
            <Navigation title="Register" link="/register" />


            <div className="form-background animate__animated animate__fadeIn">
                <form id="login-form" onSubmit={handleLogin}>
                    <div className="login-form__top">
                        <div>Yanji Social</div>
                    </div>
                    <div className="login-form__container">
                        <div className="login-form__title">
                            <span>Login</span>
                        </div>
                        <div className="login-form__container-body">
                            {/* USERNAME */}
                            <div className="login-form__input">
                                <div>
                                    <label htmlFor="">Username</label>
                                    <input
                                        type="text"
                                        placeholder="username"
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </div>
                                <span></span>
                            </div>
                            {/* PASSWORD */}
                            <div className="login-form__input">
                                <div>
                                    <label htmlFor="">Password</label>
                                    <input
                                        type="password"
                                        placeholder="password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <span></span>
                            </div>
                            <button type="submit">Sign in</button>
                            <div className="register-form__footer">
                                <Link to="/">Forgot your password?</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default LoginPage;
