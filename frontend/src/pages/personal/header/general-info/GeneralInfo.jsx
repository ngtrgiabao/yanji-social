import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { UilCamera } from "@iconscout/react-unicons";

import AvatarFriends from "./AvatarFriends";
import avtarImg from "../../../../assets/avatar/kayo.jpg";

import "../../../../style/pages/personal/header/general-info/generalInfo.css";

function GeneralInfo() {
    const [avatar, setAvatar] = useState("");
    const avatarImg = useRef(null);

    // CLEANUP URL WHEN CHANGE IMG
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    // SAVE IMG TO LOCAL
    useEffect(() => {
        avatar && window.localStorage.setItem("avatar", avatar);
    }, [avatar]);

    // GET IMG FROM LOCAL
    useEffect(() => {
        const data = window.localStorage.getItem("avatar");
        setAvatar(data);
    }, [avatar]);

    const handleUploadAvatar = (e) => {
        const file = e.target.files[0];
        if (file && file.type.substring(0, 5) === "image") {
            setAvatar(URL.createObjectURL(file));
        } else {
            setAvatar(null);
        }
    };

    const user = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    return (
        <div className="px-5 header-title">
            <div className="d-flex align-items-center justify-content-between header-title-container">
                <div
                    className="avatar position-relative"
                    onClick={() => {
                        avatarImg.current.click();
                    }}
                >
                    <img
                        loading="lazy"
                        role="presentation"
                        decoding="async"
                        src={avatar || avtarImg}
                        alt="Avatar user"
                        className="rounded-circle"
                    />
                    <input
                        type="file"
                        ref={avatarImg}
                        style={{ display: "none" }}
                        onChange={handleUploadAvatar}
                    />
                    <span className="position-absolute border border-primary rounded-circle p-2 edit-avatar">
                        <UilCamera />
                    </span>
                </div>

                <div className="information ms-4 mt-5">
                    <p className="name">{user.username}</p>
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
