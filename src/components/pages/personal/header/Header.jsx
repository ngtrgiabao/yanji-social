import React from "react";

import "./header.css";
import { UilCamera } from "@iconscout/react-unicons";
import coverImg from "../../../images/coverfb.jpg";

function Header() {
    return (
        <>
            <div className="cover position-relative">
                <span className="position-relative">
                    <img src={coverImg} alt="cover" />

                    <div className="edit-cover d-flex align-items-center">
                        <span className="me-3">
                            <UilCamera />
                        </span>
                        Edit cover
                    </div>
                </span>
            </div>
        </>
    );
}

export default Header;
