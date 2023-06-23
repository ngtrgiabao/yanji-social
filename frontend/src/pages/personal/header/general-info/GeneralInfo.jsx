import { useState } from "react";
import { useSelector } from "react-redux";
import { UilCamera } from "@iconscout/react-unicons";

import AvatarFriends from "./AvatarFriends";
import KAYO_AVATAR from "../../../../assets/avatar/kayo.jpg";

import "../../../../style/pages/personal/header/general-info/generalInfo.css";

import ChangeImagePopup from "../../../../components/ChangeImagePopup";

function GeneralInfo() {
    const [openPopup, setOpenPopup] = useState(false);

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const handlePopup = () => {
        setOpenPopup((openPopup) => !openPopup);
    };

    return (
        <div className="px-5 header-title">
            <div className="d-flex align-items-center justify-content-between header-title-container">
                <div className="position-relative" onClick={handlePopup}>
                    <div
                        className="avatar"
                        style={{
                            border: "3px solid black",
                        }}
                    >
                        <img
                            loading="lazy"
                            role="presentation"
                            decoding="async"
                            src={currentUser?.profilePicture || KAYO_AVATAR}
                            alt="Avatar user"
                        />
                    </div>
                    <span className="position-absolute border border-primary rounded-circle p-2 edit-avatar">
                        <UilCamera />
                    </span>
                </div>

                <div className="information ms-4 mt-5">
                    <p className="name" onClick={handlePopup}>
                        {currentUser?.username || "User"}
                    </p>
                    <div className="friends mb-4">1,2k Friends</div>

                    <div className="profile-title">
                        <AvatarFriends />
                    </div>
                </div>
            </div>

            {openPopup && (
                <ChangeImagePopup
                    title="Cập nhật ảnh đại diện"
                    imgSrc={currentUser.profilePicture}
                    isAvatar={true}
                    onClose={() => setOpenPopup("")}
                />
            )}
        </div>
    );
}

export default GeneralInfo;
