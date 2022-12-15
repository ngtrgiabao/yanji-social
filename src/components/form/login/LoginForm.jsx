import React from "react";

function LoginForm({ active }) {
    return (
        <div>
            {active === "active" && (
                <div className="border" id="login-form">
                    <form>
                        <div>
                            <div></div>
                            <span></span>
                        </div>
                        <div>
                            <div>
                                <span>title</span>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor=""></label>
                                    <input type="text" />
                                    <span></span>
                                </div>
                                <div>
                                    <label htmlFor=""></label>
                                    <input type="text" />
                                    <span></span>
                                </div>
                                <div>
                                    <label htmlFor=""></label>
                                    <input type="text" />
                                    <span></span>
                                </div>
                                <div>Sign in</div>
                                <div>Forgot your password?</div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default LoginForm;
