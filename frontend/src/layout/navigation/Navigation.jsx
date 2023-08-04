import { Link, useNavigate } from "react-router-dom";
import { UilSearch } from "@iconscout/react-unicons";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";

import "../../style/layouts/navigation.css";

import LOGO from "../../assets/logo/yanji-social.svg";

import { logout } from "../../redux/request/authRequest";
import { useEffect, useState } from "react";
import { getUserByID } from "../../redux/request/userRequest";

const Navigation = ({ title, link }) => {
    const [user, setUser] = useState({
        userID: "",
        profilePicture: "",
    });

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(dispatch, navigate);
    };

    useEffect(() => {
        currentUser &&
            getUserByID(currentUser._id, dispatch).then((data) => {
                const { _id, profilePicture } = data.user;
                setUser({
                    userID: _id,
                    profilePicture: profilePicture,
                });
            });
    }, [currentUser, dispatch]);

    const renderSwitchBtn = () => {
        return currentUser ? (
            <Link
                to="/logout"
                className="btn btn-danger d-flex align-items-center justify-content-center gap-4"
                htmlFor="#logout"
                onClick={handleLogout}
                data-logout-btn
            >
                Logout
            </Link>
        ) : (
            <Link
                to={link}
                className="nav__btn d-flex align-items-center justify-content-center gap-4"
                htmlFor="#create-post"
            >
                {title}
            </Link>
        );
    };

    return (
        <>
            <nav className="py-3 header-navbar">
                <div className="container d-flex align-items-center h-100">
                    <Link
                        to="/"
                        className="logo mb-0 d-flex align-items-center"
                    >
                        <img
                            src={LOGO}
                            alt=""
                            className="profile-pic me-3 border border-2 border-white"
                        />
                        <span>Yanji Social</span>
                    </Link>

                    <div className="search-bar d-flex align-items-center">
                        <UilSearch />
                        <Form.Control
                            className="ms-4"
                            type="search"
                            placeholder="Search for creators, ideas and projects"
                        />
                    </div>

                    <div className="d-flex justify-content-end align-items-center">
                        {renderSwitchBtn()}
                        {currentUser && (
                            <Link
                                aria-label="Avatar user"
                                to={currentUser ? `/user/${user.userID}` : "/"}
                                className="profile-pic ms-4 border border-2 border-white text-white"
                            >
                                {user.profilePicture ? (
                                    <img
                                        loading="lazy"
                                        role="presentation"
                                        decoding="async"
                                        className="w-100"
                                        src={user.profilePicture}
                                        alt="Avatar user"
                                    />
                                ) : (
                                    <>{currentUser.username}</>
                                )}
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;
