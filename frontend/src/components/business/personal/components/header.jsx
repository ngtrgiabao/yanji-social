import { useRef, useState, memo } from "react";
import { Camera } from "lucide-react";
import isEqual from "react-fast-compare";

import "../styles/personalHeader.css";

import ChangeImagePopup from "../../../../components/ui/popup/change-image";
import { useCurrentUser } from "../../../../hooks";
import Banner from "./banner";

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
          <Banner bannerUrl={userInfo?.coverPicture} />
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

export default memo(PersonalHeader, isEqual);
