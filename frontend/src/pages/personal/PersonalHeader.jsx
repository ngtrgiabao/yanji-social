import { useRef, useState } from "react";
import { UilCamera } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";

import "../../style/pages/personal/personalHeader.css";

import DEFAULT_BG from "../../assets/background/default_bg_user.svg";

import ChangeImagePopup from "../../components/ChangeImagePopup";

const PersonalHeader = ({ userInfo, socket }) => {
    const [openPopup, setOpenPopup] = useState(false);

    const handlePopup = () => {
        setOpenPopup((openPopup) => !openPopup);
    };

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const snackBar = useRef(null);

    const handleUpdatePopup = () => {
        if (snackBar.current) {
            const sb = snackBar.current;
            sb.className = "show";

            setTimeout(() => {
                sb.className = sb.className.replace("show", "");
                window.location.reload();
            }, 3000);
        }
    };

    return (
        <div className="cover">
            <span className="position-relative">
                <div className="cover-picture bg-black">
                    {userInfo.coverPicture ? (
                        <img
                            loading="lazy"
                            role="presentation"
                            decoding="async"
                            src={userInfo.coverPicture}
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

                {userInfo?._id === currentUser?._id && (
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
                        imgSrc={userInfo.coverPicture}
                        isCircle={false}
                        isCover={true}
                        onClose={() => setOpenPopup("")}
                        message="Update cover successfully"
                        socket={socket}
                        handleUpdatePopup={handleUpdatePopup}
                    />
                )}
            </span>

            <div
                ref={snackBar}
                id="snackbar"
                style={{
                    backgroundColor: "var(--color-success)",
                }}
                className="fw-bold"
            >
                Update cover successfully
            </div>
        </div>
    );
};

export default PersonalHeader;
