import React from "react";

import "./body.css";
import avatarImg from "../../../images/profile-pic.png";
import Friends from "./friends/Friends";
import Introduce from "./introduce/Introduce";
import SocialLinks from "./socialLinks/SocialLinks";

function Body() {
    return (
        <div className="row place-items-center gap-3">
            <div className="col p-4">
                <div className="row p-3">
                    <Introduce />
                </div>
                <div className="row p-3">
                    <Friends />
                </div>
                <div className="row p-3">
                    <SocialLinks />
                </div>
            </div>
            <div className="col-7">
                <p className="fs-1 fw-bold">Introduce</p>

                <div className="row d-flex border-bottom pb-4">
                    <div className="profile-pic p-0 rounded-circle overflow-hidden">
                        <img src={avatarImg} alt="avatar" />
                    </div>
                    <button className="ms-3 btn btn-light col-sm d-flex align-items-center text-muted">
                        What are you thinking, Yanji
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Body;
