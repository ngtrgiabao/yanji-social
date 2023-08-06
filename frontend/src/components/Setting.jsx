import React, { useState } from "react";
import { UilSetting } from "@iconscout/react-unicons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const Setting = ({ close }) => {
    const [active, setActive] = useState("PUBLIC");

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const renderPublicInfoContent = () => {
        return (
            <div
                className="w-100"
                style={{
                    paddingRight: "7rem",
                }}
            >
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-column align-items-start">
                        <label htmlFor="firstname" className="mb-2 fw-light">
                            Firstname
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            className="p-2 px-3"
                            style={{
                                borderRadius: "1rem",
                            }}
                            defaultValue={currentUser.firstName}
                            placeholder="Your firstname"
                        />
                    </div>
                    <div className="d-flex flex-column align-items-start">
                        <label htmlFor="lastname" className="mb-2 fw-light">
                            Lastname
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            className="p-2 px-3"
                            style={{
                                borderRadius: "1rem",
                            }}
                            defaultValue={currentUser.lastName}
                            placeholder="Your lastname"
                        />
                    </div>
                </div>
                <div className="d-flex flex-column align-items-start mt-2">
                    <label htmlFor="bio" className="mb-2 fw-light">
                        Bio
                    </label>
                    <textarea
                        type="text"
                        id="bio"
                        className="w-100 p-2 px-3"
                        style={{
                            borderRadius: "1rem",
                            height: "7rem",
                            resize: "none",
                        }}
                        defaultValue={currentUser.bio}
                    ></textarea>
                </div>
                <div className="mt-2 d-flex flex-column align-items-start">
                    <label htmlFor="nickname" className="fw-light mb-2">
                        Nickname ( @{currentUser.username} )
                    </label>
                    <input
                        type="text"
                        id="nickname"
                        className="w-100 p-2 px-3"
                        style={{
                            borderRadius: "1rem",
                        }}
                        defaultValue={currentUser.username}
                    />
                </div>
            </div>
        );
    };

    const renderManagerAccountContent = () => {
        return (
            <div>
                <div className="d-flex flex-column align-items-start mb-4">
                    <label className="mb-2" htmlFor="email">
                        Email * private
                    </label>
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        className="p-2 px-3 w-100"
                        style={{
                            borderRadius: "1rem",
                        }}
                        defaultValue={currentUser.email}
                    />
                </div>

                <div className="d-flex flex-column align-items-start">
                    <label className="mb-2" htmlFor="Password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="Password"
                        className="p-2 px-3 w-100"
                        style={{
                            borderRadius: "0.5rem",
                        }}
                        defaultValue={currentUser.password}
                    />
                    <div
                        className="mt-2 custom-btn d-flex align-items-center justify-content-center text-white p-2 px-3"
                        style={{
                            background: "var(--color-primary)",
                            borderRadius: "0.8rem",
                        }}
                    >
                        Change password
                    </div>
                </div>
            </div>
        );
    };

    const renderSecureContent = () => {
        return (
            <div className="d-flex flex-column align-items-end">
                <>
                    <div className="fs-3 fw-bold mb-2 w-100">
                        Download your data
                    </div>
                    <p className="text-start">
                        Bạn có thể yêu cầu tải xuống thông tin Yanji Social của
                        mình bất kỳ lúc nào. Yêu cầu của bạn sẽ được nhà cung
                        cấp bên thứ ba của chúng tôi là Yanji Auth xác minh.
                    </p>
                </>
                <div
                    className="p-3 custom-btn text-white"
                    style={{
                        background: "var(--color-primary)",
                        borderRadius: "0.5rem",
                    }}
                >
                    Download your data
                </div>
            </div>
        );
    };

    const renderLogoutContent = () => {
        return (
            <div className="d-flex flex-column align-items-center">
                <h2 className="fw-bold">Logout now ?</h2>
                <div
                    className="mt-4 bg-danger p-3 px-4 text-white"
                    style={{
                        width: "max-content",
                        borderRadius: "0.5rem",
                    }}
                >
                    Logout
                </div>
            </div>
        );
    };

    return (
        <div
            className="card animate__animated animate__fadeInLeft d-grid w-50"
            onClick={(e) => {
                if (e.currentTarget.classList.contains("card")) {
                    e.stopPropagation();
                }
            }}
        >
            <div className="mb-4 d-flex align-items-center justify-content-between">
                <div className="fs-3 text-uppercase d-flex">
                    <UilSetting /> <span className="ms-2">Setting</span>
                </div>
                <div
                    className="p-2 px-3 custom-btn text-danger"
                    style={{
                        cursor: "pointer",
                    }}
                    onClick={() => close()}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </div>
            </div>
            <div className="row h-100">
                <div
                    className="col"
                    style={{
                        borderRight: "1px solid",
                    }}
                >
                    <div
                        className="d-flex align-items-center p-3 custom-btn"
                        style={{
                            height: "5rem",
                            borderRadius: "0.5rem",
                            background:
                                active === "PUBLIC" && "var(--color-primary)",
                        }}
                        onClick={() => setActive("PUBLIC")}
                    >
                        Public information
                    </div>
                    <div
                        className="d-flex align-items-center p-3 custom-btn"
                        style={{
                            height: "5rem",
                            borderRadius: "0.5rem",
                            background:
                                active === "MANAGER" && "var(--color-primary)",
                        }}
                        onClick={() => setActive("MANAGER")}
                    >
                        Manager account
                    </div>
                    <div
                        className="d-flex align-items-center p-3 custom-btn"
                        style={{
                            height: "5rem",
                            borderRadius: "0.5rem",
                            background:
                                active === "TERMS" && "var(--color-primary)",
                        }}
                        onClick={() => setActive("TERMS")}
                    >
                        Security and Data
                    </div>
                    <div
                        className="d-flex align-items-center p-3 custom-btn"
                        style={{
                            height: "5rem",
                            borderRadius: "0.5rem",
                            background:
                                active === "LOGOUT" && "var(--color-primary)",
                        }}
                        onClick={() => setActive("LOGOUT")}
                    >
                        Logout
                    </div>
                </div>
                <div
                    className="col-8 ms-5"
                    style={{
                        height: "25rem",
                        overflowY: "auto",
                    }}
                >
                    {active === "PUBLIC" && renderPublicInfoContent()}
                    {active === "MANAGER" && renderManagerAccountContent()}
                    {active === "TERMS" && renderSecureContent()}
                    {active === "LOGOUT" && renderLogoutContent()}
                </div>
            </div>

            <div className="d-flex justify-content-end me-5">
                <span
                    className="me-3 p-2 custom-btn text-danger"
                    onClick={() => close()}
                >
                    Cancel
                </span>
                <span className="p-2 custom-btn">Save change</span>
            </div>
        </div>
    );
};

export default Setting;
