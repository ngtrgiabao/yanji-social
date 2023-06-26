import { useState } from "react";
import { UilCamera } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";

import PersonalAvatarFriends from "./PersonalAvatarFriends";

import "../../style/pages/personal/personalGeneralInfo.css";

import ChangeImagePopup from "../../components/ChangeImagePopup";

const PersonalGeneralInfo = ({ user }) => {
    const [openPopup, setOpenPopup] = useState(false);

    const handlePopup = () => {
        setOpenPopup((openPopup) => !openPopup);
    };

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    return (
        <div className="px-5 header-title">
            <div className="d-flex align-items-center justify-content-between header-title-container">
                <div
                    className="position-relative"
                    onClick={() =>
                        user._id === currentUser._id && handlePopup()
                    }
                >
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
                            src={user?.profilePicture}
                            alt="Avatar user"
                        />
                    </div>
                    {user._id === currentUser._id && (
                        <span className="position-absolute border border-primary rounded-circle p-2 edit-avatar">
                            <UilCamera />
                        </span>
                    )}
                </div>

                <div className="information ms-4 mt-5">
                    <p className="name" onClick={handlePopup}>
                        {user?.username || "User"}
                    </p>
                    <div className="friends mb-4">1,2k Friends</div>

                    <div className="profile-title">
                        <PersonalAvatarFriends user={user} />
                    </div>
                </div>
            </div>

            {openPopup && (
                <ChangeImagePopup
                    title="Cập nhật ảnh đại diện"
                    imgSrc={user.profilePicture}
                    isAvatar={true}
                    onClose={() => setOpenPopup("")}
                />
            )}
        </div>
    );
};

export default PersonalGeneralInfo;
