import { Link, useNavigate } from "react-router-dom";
import { UilSearch } from "@iconscout/react-unicons";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "../../style/layouts/navigation.css";

import LOGO from "../../assets/logo/yanji-social.svg";

import { logout } from "../../redux/request/authRequest";
import { useEffect, useState } from "react";
import { getUserByID } from "../../redux/request/userRequest";

const Navigation = ({ title, link, isSearch = true }) => {
    const [users, setUsers] = useState([]);
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
                if (data) {
                    const { _id, profilePicture } = data.user;
                    setUser({
                        userID: _id,
                        profilePicture: profilePicture,
                    });
                }
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

    const searchUser = async (e) => {
        const value = e.target.value;

        const data = await axios.get(
            process.env.REACT_APP_SOCKET_URL +
                `/api/v1/user/all-users/?username=${value.toLowerCase()}`
        );

        const userList = data.data.users;

        if (userList.length > 0) {
            setUsers(userList);
        } else {
            setUsers([]);
        }
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

                    {isSearch && (
                        <div className="search-bar d-flex align-items-center position-relative">
                            <UilSearch />
                            <Form.Control
                                className="ms-4"
                                type="search"
                                placeholder="Search for creators, ideas and projects"
                                onChange={(e) => searchUser(e)}
                            />

                            <div
                                className="position-absolute w-100 text-white overflow-auto"
                                style={{
                                    left: "0",
                                    top: "110%",
                                    maxHeight: "30rem",
                                }}
                            >
                                {users.map((u) => (
                                    <Link
                                        to={`/user/${u._id}`}
                                        className="d-flex align-items-center p-3 fs-5 text-white"
                                        style={{
                                            background:
                                                "var(--color-primary-light)",
                                        }}
                                        key={u._id}
                                    >
                                        <div className="profile-pic d-flex justify-content-center align-items-center me-3">
                                            {u.profilePicture ? (
                                                <img
                                                    src={u.profilePicture}
                                                    alt=""
                                                    className="w-100"
                                                />
                                            ) : (
                                                <>{u.username}</>
                                            )}
                                        </div>
                                        {u.username}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

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
