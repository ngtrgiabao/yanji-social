import { useState } from "react";
import { useSelector } from "react-redux";
import { UilCamera } from "@iconscout/react-unicons";

import "../../../style/pages/personal/header/header.css";
import coverImg from "../../../assets/background/coverfb.jpg";
import ChangeImagePopup from "../../../components/ChangeImagePopup";

function Header() {
    const [openPopup, setOpenPopup] = useState(false);

    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

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
                        src={currentUser.coverPicture || coverImg}
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
                        imgSrc={currentUser.coverPicture}
                        isCircle={false}
                        isCover={true}
                        onClose={() => setOpenPopup("")}
                    />
                )}
            </span>
        </div>
    );
}

export default Header;
