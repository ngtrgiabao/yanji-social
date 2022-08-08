import { Link } from "react-router-dom";
import React from "react";
import { UilSearch } from "@iconscout/react-unicons";
import "./navigation.css";

const Navigation = () => {
    return (
        <nav className="navbar py-3">
            <div className="container d-flex align-items-center">
                <Link to="/" className="logo mb-0">
                    Yanji Social
                </Link>

                <div className="search-bar d-flex align-items-center">
                    <UilSearch />
                    <input
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
                    <div className="profile-pic ms-4">
                        <img
                            src="https://media-exp1.licdn.com/dms/image/C5603AQHahqdNdU7CCA/profile-displayphoto-shrink_400_400/0/1658923673703?e=1664409600&v=beta&t=Y_2otdi9rMFUOgjjgwfBTpwGo-w_ceowGQ6akNkiym0"
                            alt="avatar"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
