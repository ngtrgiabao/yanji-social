import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { UilSearch } from "@iconscout/react-unicons";
import Form from "react-bootstrap/Form";

import "./navigation.css";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/apiRequest";

const Navigation = (props) => {
    const { title, link } = props;

    const user = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(dispatch, navigate);
    };

    return (
        <>
            <nav className="py-3 header-navbar">
                <div
                    className="container d-flex align-items-center"
                    style={{ height: "100%" }}
                >
                    <Link to="/" className="logo mb-0">
                        Yanji Social
                    </Link>

                    <div className="search-bar d-flex align-items-center">
                        <UilSearch />
                        <Form.Control
                            className="ms-4"
                            type="search"
                            placeholder="Search for creators, ideas and projects"
                        />
                    </div>

                    <div className="create d-flex align-items-center">
                        {user ? (
                            <Link
                                to="/logout"
                                className="btn btn-primary d-flex align-items-center justify-content-center gap-4"
                                htmlFor="#logout"
                                onClick={handleLogout}
                            >
                                Logout
                            </Link>
                        ) : (
                            <Link
                                to={link}
                                className="btn btn-primary d-flex align-items-center justify-content-center gap-4"
                                htmlFor="#create-post"
                            >
                                {title}
                            </Link>
                        )}
                        <Link to="/user" className="profile-pic ms-4">
                            <img src={ProfilePic} alt="avatar" />
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;
