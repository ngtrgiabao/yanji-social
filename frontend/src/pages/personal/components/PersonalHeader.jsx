import { useRef, useState } from "react";
import { Camera } from "lucide-react";

import "../styles/personalHeader.css";

import { ChangeImagePopup } from "../../../components";
import { useCurrentUser } from "../../../hooks";

const PersonalHeader = ({ userInfo, socket }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const currentUser = useCurrentUser();

  const handlePopup = () => {
    setOpenPopup((openPopup) => !openPopup);
  };

  const snackBar = useRef(null);

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
              alt="background"
            />
          ) : (
            <span className="fs-4">Don't have wallpaper</span>
          )}
        </div>

        {userInfo?._id === currentUser?._id && (
          <div
            className="edit-cover d-flex align-items-center justify-content-center"
            onClick={handlePopup}
          >
            <Camera size={20} className="me-2" />
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
