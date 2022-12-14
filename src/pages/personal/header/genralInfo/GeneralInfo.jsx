import React from "react";
import { UilCamera } from "@iconscout/react-unicons";

import AvatarFriends from "./AvatarFriends";
import avtarImg from "../../../../images/profile-pic.png";

import "./generalInfo.css";

function GeneralInfo() {
    return (
        <div className="px-5 header-title">
            <div className="d-flex align-items-center header-title-container">
                <div className="avatar border border-dark rounded-circle position-relative">
                    <img
                        src={avtarImg}
                        alt="avatar"
                        className="rounded-circle"
                    />
                    <span className="position-absolute border border-primary rounded-circle p-2 edit-avatar">
                        <UilCamera />
                    </span>
                </div>

                <div className="information ms-5 mt-5">
                    <p className="name">Nguyen Tran Gia Bao</p>
                    <div className="friends mb-4">1,2k Friends</div>

                    <div className="profile-title">
                        <AvatarFriends />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GeneralInfo;
