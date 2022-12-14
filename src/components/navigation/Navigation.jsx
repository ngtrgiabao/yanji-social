import { Link } from "react-router-dom";
import React from "react";
import { UilSearch } from "@iconscout/react-unicons";
import Form from "react-bootstrap/Form";

import "./navigation.css";

import ProfilePic from "../../images/profile-pic.png";

const Navigation = () => {
    return (
        <nav className="navbar py-3">
            <div className="container d-flex align-items-center">
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
                    <label
                        className="btn btn-primary d-flex align-items-center justify-content-center gap-4"
                        htmlFor="#create-posst"
                    >
                        Create
                    </label>
                    <Link to="/user" className="profile-pic ms-4">
                        <img src={ProfilePic} alt="avatar" />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
