import { useState } from "react";
import { UilCamera } from "@iconscout/react-unicons";

import coverImg from "../../assets/background/coverfb.jpg";

import "../../style/pages/personal/personalHeader.css";

import ChangeImagePopup from "../../components/ChangeImagePopup";

const PersonalHeader = ({ user }) => {
    const [openPopup, setOpenPopup] = useState(false);

    const handlePopup = () => {
        setOpenPopup((openPopup) => !openPopup);
    };

    return (
        <div className="cover">
            <span className="position-relative">
                <div className="cover-picture">
                    <img
                        loading="lazy"
                        role="presentation"
                        decoding="async"
                        src={user.coverPicture || coverImg}
                        alt="Background cover"
                    />
                </div>

                <div
                    className="edit-cover d-flex align-items-center"
                    onClick={handlePopup}
                >
                    <span className="me-3">
                        <UilCamera />
                    </span>
                    Edit cover
                </div>

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
