import React from "react";
import { UilSearch } from "@iconscout/react-unicons";
import "./navigation.css";

const Navigation = () => {
    return (
        <nav className="navbar py-3">
            <div className="container d-flex align-items-center">
                <h2 className="logo mb-0">Yanji Social</h2>

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
                            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpreview.redd.it%2Fevtlnz66q7j61.jpg%3Fwidth%3D960%26crop%3Dsmart%26auto%3Dwebp%26s%3Dc118a6a2630e2c9a2b9412a20c8bc54f19b087dc&f=1&nofb=1"
                            alt="avatar"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
