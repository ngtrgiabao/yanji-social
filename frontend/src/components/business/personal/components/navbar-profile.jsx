import { useEffect, useState, useRef, memo } from "react";
import { CSVLink } from "react-csv";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  MoreHorizontal,
  FileDown,
  UserRoundCog,
  Bookmark,
  Palette,
} from "lucide-react";
import isEqual from "react-fast-compare";

import "../styles/personalNavbarProfile.css";
import { Setting, CustomBorderAvatarSetting } from "../../../../components";
import { useCurrentUser } from "../../../../hooks";
import { RouteNames } from "../../../../constant/routes";

const PersonalNavbarProfile = () => {
  const { userID: userRoute } = useParams();
  const { photos: photosRoute } = useParams();
  const currentUser = useCurrentUser();
  const [checked, setChecked] = useState(false);
  const exportData = useRef(null);
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 1,
      title: "Post",
      link: `user/${userRoute}`,
    },
    {
      id: 2,
      title: "Photos",
      link: `user/${userRoute}/photos`,
    },
  ];

  const handleExportData = () => {
    exportData.current.link.click();
  };

  const handleVisitSavedPost = () => {
    navigate(RouteNames.BOOKMARKS);
  };

  const [active, setActive] = useState("");
  const [active1, setActive1] = useState("");

  const handleClosePopup = () => {
    setActive("");
  };
  const handleClosePopup1 = () => {
    setActive1("");
  };

  const renderSettingPopup = () => {
    return (
      <div
        className="customize-theme"
        hidden={active !== "SETTINGS"}
        onClick={() => setActive("")}
      >
        <Setting close={handleClosePopup} />
      </div>
    );
  };

  const renderSettingAvatar = () => {
    return (
      <div
        className="customize-theme"
        hidden={active1 !== "CustomBorderAvatarSetting"}
        onClick={() => setActive1("")}
      >
        <CustomBorderAvatarSetting close={handleClosePopup1} />
      </div>
    );
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".box-setting-profile")) {
        setChecked(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSettingPersonalPage = (e) => {
    e.stopPropagation();
    setChecked((checked) => !checked);
  };

  const renderSettingProfile = () => {
    return (
      currentUser._id === userRoute && (
        <span
          className="btn btn-dots text-light d-flex align-items-center py-1 px-3 me-2"
          onClick={(e) => handleSettingPersonalPage(e)}
        >
          <MoreHorizontal size={20} />
          {checked && (
            <div className="box-setting-profile rounded-3">
              <div className="p-3">
                <div
                  className="box-setting-profile-item d-flex align-items-center rounded-3 p-2 px-3"
                  onClick={handleExportData}
                >
                  <FileDown size={20} />
                  <p className="ms-3 my-3 fs-4 fw-bold">Download your data</p>
                </div>
                <div
                  onClick={handleVisitSavedPost}
                  className="box-setting-profile-item d-flex align-items-center rounded-3 p-2 px-3"
                >
                  <Bookmark size={20} />
                  <p className="ms-3 my-3 fs-4 fw-bold">Your bookmark</p>
                </div>
                <div
                  className="box-setting-profile-item d-flex align-items-center rounded-3 p-2 px-3"
                  onClick={() => setActive("SETTINGS")}
                >
                  <UserRoundCog size={20} />
                  <p className="ms-3 my-3 fs-4 fw-bold">Profile Settings</p>
                </div>
                <div
                  className="box-setting-profile-item d-flex align-items-center rounded-3 p-2 px-3"
                  onClick={() => setActive1("CustomBorderAvatarSetting")}
                >
                  <Palette size={20} />
                  <p className="ms-3 my-3 fs-4 fw-bold">Custom Border Avatar</p>
                </div>
              </div>
            </div>
          )}
        </span>
      )
    );
  };

  const csvData = [
    ["username", "password", "email"],
    [currentUser?.username, currentUser?.password, currentUser?.email],
  ];

  return (
    <div className="d-flex align-items-center justify-content-between mb-4 position-relative">
      <nav className="navbar menu-list navbar-expand-lg ">
        <div className="d-flex flex-row navbar-collapse" id="main_nav">
          <ul className="navbar-nav d-flex align-items-center flex-row">
            {menuItems.map((item) => (
              <li key={item.id} className="nav-item">
                <Link
                  to={RouteNames.HOME + item.link}
                  className={`${
                    (userRoute && !photosRoute && item.id === 1) ||
                    (userRoute && photosRoute && item.id === 2)
                      ? "active"
                      : ""
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            ))}

            {/* Export user data */}
            <CSVLink
              ref={exportData}
              data={csvData}
              filename={`${currentUser?.username}-data.csv`}
              target="_blank"
              style={{ display: "none" }}
            />
          </ul>
        </div>
      </nav>
      {renderSettingProfile()}
      {renderSettingPopup()}
      {renderSettingAvatar()}
    </div>
  );
};

export default memo(PersonalNavbarProfile, isEqual);
