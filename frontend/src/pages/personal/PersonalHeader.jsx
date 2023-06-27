import { useState } from "react";
import { UilCamera } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";

import "../../style/pages/personal/personalHeader.css";

import DEFAULT_BG from "../../assets/background/default_bg_user.svg";

import ChangeImagePopup from "../../components/ChangeImagePopup";

const PersonalHeader = ({ user }) => {
    const [openPopup, setOpenPopup] = useState(false);

    const handlePopup = () => {
        setOpenPopup((openPopup) => !openPopup);
    };

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    return (
        <div className="cover">
            <span className="position-relative">
                <div className="cover-picture bg-black">
                    {user.coverPicture ? (
                        <img
                            loading="lazy"
                            role="presentation"
                            decoding="async"
                            src={user.coverPicture}
                            alt="Background cover"
                        />
                    ) : (
                        <img
                            src={DEFAULT_BG}
                            alt=""
                            style={{
                                objectFit: "cover",
                            }}
                        />
                    )}
                </div>

                {user._id === currentUser._id && (
                    <div
                        className="edit-cover d-flex align-items-center"
                        onClick={handlePopup}
                    >
                        <span className="me-3">
                            <UilCamera />
                        </span>
                        Edit cover
                    </div>
                )}

                {openPopup && (
                    <ChangeImagePopup
                        title="Cập nhật ảnh bìa"
                        imgSrc={user.coverPicture}
                        isCircle={false}
                        isCover={true}
                        onClose={() => setOpenPopup("")}
                    />
                )}
            </span>
        </div>
    );
};

export default PersonalHeader;
