import React from "react";

import { Link } from "react-router-dom";

import Navigation from "../../navigation/Navigation";

function LoginPage() {
    return (
        <>
            <Navigation />

            <div className="form-background">
                <form id="login-form">
                    <div className="login-form__top">
                        <div>Yanji Social</div>
                    </div>
                    <div className="login-form__container">
                        <div className="login-form__title">
                            <span>Login</span>
                        </div>
                        <div className="login-form__container-body">
                            <div className="login-form__input">
                                <div>
                                    <label htmlFor="">Username</label>
                                    <input type="text" placeholder="username" />
                                </div>
                                <span></span>
                            </div>
                            <div className="login-form__input">
                                <div>
                                    <label htmlFor="">Password</label>
                                    <input
                                        type="password"
                                        placeholder="password"
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
