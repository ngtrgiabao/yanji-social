import { useRef, useState } from "react";
import { UilCamera } from "@iconscout/react-unicons";

import "../styles/personalHeader.css";

import { ChangeImagePopup } from "../../../components";
import {useCurrentUser} from "../../../shared/hooks";

const PersonalHeader = ({ userInfo, socket }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const currentUser = useCurrentUser();

  const handlePopup = () => {
    setOpenPopup((openPopup) => !openPopup);
  };

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
    <div className="cover position-relative">
      <span className="w-100 h-100">
        <div className="cover-picture bg-black text-white d-flex justify-content-center align-items-center">
          {userInfo.coverPicture ? (
            <img
              loading="lazy"
              role="presentation"
              decoding="async"
              src={userInfo.coverPicture}
              alt="Background cover"
            />
          ) : (
            <span className="fs-4">Empty wallpaper</span>
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
