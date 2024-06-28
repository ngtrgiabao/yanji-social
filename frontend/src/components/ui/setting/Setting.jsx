import { memo, useEffect, useRef, useState } from "react";
import { UilSetting } from "@iconscout/react-unicons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import { X } from "lucide-react";
import isEqual from "react-fast-compare";

import { logout } from "../../../redux/request/authRequest";
import { getUserByID, updateUser } from "../../../redux/request/userRequest";
import { useCurrentUser } from "../../../hooks";

// TODO CHANGE BG DANGER OF POPUP WHEN UPDATE USER FAILED

const Setting = ({ close }) => {
  const [active, setActive] = useState("PUBLIC");
  const exportData = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bio: "",
  });
  const [isChange, setIsChange] = useState(false);
  const currentUser = useCurrentUser();

  const csvData = [
    ["username", "password", "email"],
    [currentUser?.username, currentUser?.password, currentUser?.email],
  ];

  const handleExportData = () => {
    exportData.current.link.click();
  };

  useEffect(() => {
    getUserByID(currentUser?._id, dispatch).then((data) => {
      if (data) {
        setUserInfo(data.user);
      }
    });
  }, [currentUser?._id, dispatch]);

  useEffect(() => {
    userInfo &&
      getUserByID(currentUser?._id, dispatch).then((data) => {
        if (data) {
          const { username, firstName, lastName, email, password, bio } =
            data.user;
          if (
            username !== userInfo.username ||
            firstName !== userInfo.firstName ||
            lastName !== userInfo.lastName ||
            email !== userInfo.email ||
            password !== userInfo.password ||
            bio !== userInfo.bio
          ) {
            setIsChange(true);
          }
        }
      });
  }, [userInfo, currentUser?._id, dispatch]);

  const snackBar = useRef(null);

  const handleUpdateUser = () => {
    getUserByID(currentUser?._id, dispatch).then((data) => {
      if (data) {
        const { username, firstName, lastName, email, password, bio } =
          data.user;

        if (
          username !== userInfo.username ||
          firstName !== userInfo.firstName ||
          lastName !== userInfo.lastName ||
          email !== userInfo.email ||
          password !== userInfo.password ||
          bio !== userInfo.bio
        ) {
          let updatedUser = {
            userID: currentUser?._id,
            username: userInfo.username,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            password: userInfo.password,
            bio: userInfo.bio,
          };

          updateUser(updatedUser, dispatch)
            .then(() => {
              if (snackBar.current) {
                const sb = snackBar.current;
                sb.className = "show";

                setTimeout(() => {
                  sb.className = sb.className.replace("show", "");
                }, 3000);
              }
            })
            .catch((err) => {
              console.error("Failed to update", err);
              setIsChange(false);
            });
        }
      }
    });
  };

  const renderPublicInfoContent = () => {
    return (
      <div
        className="w-100"
        style={{
          paddingRight: "7rem",
        }}
      >
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column align-items-start">
            <label htmlFor="firstname" className="mb-2 fw-light">
              Firstname
            </label>
            <input
              type="text"
              id="firstname"
              className="p-2 px-3"
              style={{
                borderRadius: "0.5rem",
              }}
              defaultValue={userInfo?.firstName}
              placeholder="Your firstname"
              onChange={(e) =>
                setUserInfo((prevUser) => ({
                  ...prevUser,
                  firstName: e.target.value,
                }))
              }
              maxLength={100}
            />
          </div>
          <div className="d-flex flex-column align-items-start">
            <label htmlFor="lastname" className="mb-2 fw-light">
              Lastname
            </label>
            <input
              type="text"
              id="lastname"
              className="p-2 px-3"
              style={{
                borderRadius: "0.5rem",
              }}
              defaultValue={userInfo?.lastName}
              placeholder="Your lastname"
              onChange={(e) =>
                setUserInfo((prevUser) => ({
                  ...prevUser,
                  lastName: e.target.value,
                }))
              }
              maxLength={100}
            />
          </div>
        </div>
        <div className="d-flex flex-column align-items-start mt-2">
          <label htmlFor="bio" className="mb-2 fw-light">
            Bio
          </label>
          <textarea
            type="text"
            id="bio"
            className="w-100 p-2 px-3"
            style={{
              borderRadius: "0.5rem",
              height: "7rem",
              resize: "none",
            }}
            defaultValue={userInfo?.bio}
            onChange={(e) =>
              setUserInfo((prevUser) => ({
                ...prevUser,
                bio: e.target.value,
              }))
            }
          ></textarea>
        </div>
        <div className="mt-2 d-flex flex-column align-items-start">
          <label htmlFor="nickname" className="fw-light mb-2">
            Nickname ( @{userInfo?.username} )
          </label>
          <input
            type="text"
            id="nickname"
            className="w-100 p-2 px-3"
            style={{
              borderRadius: "0.5rem",
            }}
            defaultValue={userInfo?.username}
            onChange={(e) =>
              setUserInfo((prevUser) => ({
                ...prevUser,
                username: e.target.value,
              }))
            }
            maxLength={20}
          />
        </div>
      </div>
    );
  };

  const pwd = useRef(null);

  const showPwd = () => {
    if (pwd.current) {
      if (pwd.current.type === "password") {
        pwd.current.type = "text";
      } else {
        pwd.current.type = "password";
      }
    }
  };

  const renderManagerAccountContent = () => {
    return (
      <>
        <div className="d-flex flex-column align-items-start mb-4">
          <label className="mb-2" htmlFor="email">
            Email (private)
          </label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="p-2 px-3 w-100"
            style={{
              borderRadius: "0.5rem",
            }}
            defaultValue={userInfo?.email}
            onChange={(e) =>
              setUserInfo((prevUser) => ({
                ...prevUser,
                email: e.target.value,
              }))
            }
          />
        </div>

        <div className="d-flex flex-column align-items-start">
          <label className="mb-2" htmlFor="Password">
            Password
          </label>
          <input
            type="password"
            id="Password"
            className="p-2 px-3 w-100"
            style={{
              borderRadius: "0.5rem",
            }}
            defaultValue={userInfo?.password}
            ref={pwd}
            onChange={(e) =>
              setUserInfo((prevUser) => ({
                ...prevUser,
                password: e.target.value,
              }))
            }
            maxLength={100}
          />
          <div className="d-flex align-items-center mt-2 mb-3">
            <input
              id="show-pwd"
              type="checkbox"
              onClick={showPwd}
              className="me-2"
              style={{
                cursor: "pointer",
              }}
            />
            <label
              htmlFor="show-pwd"
              style={{
                cursor: "pointer",
              }}
            >
              Show Password
            </label>
          </div>
        </div>
      </>
    );
  };

  const renderSecureContent = () => {
    return (
      <div className="d-flex flex-column align-items-end">
        <>
          <div className="fs-3 fw-bold mb-2 w-100">Download your data</div>
          <p className="text-start">
            Bạn có thể yêu cầu tải xuống thông tin Yanji Social của mình bất kỳ
            lúc nào. Yêu cầu của bạn sẽ được nhà cung cấp bên thứ ba của chúng
            tôi là Yanji Auth xác minh.
          </p>
        </>
        <div
          role="button"
          className="p-3 text-white hover-bg"
          style={{
            background: "var(--color-primary)",
            borderRadius: "0.5rem",
          }}
          onClick={() => handleExportData()}
        >
          Download your data
        </div>
      </div>
    );
  };

  const handleLogout = () => {
    logout(dispatch, navigate);
    close();
  };

  const renderLogoutContent = () => {
    return (
      <div className="d-flex flex-column align-items-center">
        <h2 className="fw-bold">Logout now ?</h2>
        <div
          role="button"
          className="mt-4 bg-danger p-3 px-4 text-white hover-bg"
          style={{
            width: "max-content",
            borderRadius: "0.5rem",
          }}
          onClick={() => handleLogout()}
        >
          Logout
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className="card animate__animated animate__fadeInLeft d-grid w-50"
        onClick={(e) => {
          if (e.currentTarget.classList.contains("card")) {
            e.stopPropagation();
          }
        }}
      >
        <div
          className="mb-4 d-flex align-items-center justify-content-between"
          data-setting
        >
          <div className="fs-3 text-uppercase d-flex align-items-center">
            <UilSetting /> <span className="ms-2">Setting</span>
          </div>
          <div
            role="button"
            className="p-2 px-3 hover-bg text-danger"
            onClick={() => {
              close();
              setActive("PUBLIC");
            }}
          >
            <X size={20} />
          </div>
        </div>

        <div className="row h-100">
          <div
            className="col"
            style={{
              borderRight: "1px solid",
            }}
            data-public-info
          >
            <div
              role="button"
              className="d-flex align-items-center p-3 hover-bg"
              style={{
                height: "5rem",
                borderRadius: "0.5rem",
                background: active === "PUBLIC" && "var(--color-primary)",
                color: active === "PUBLIC" && "white",
              }}
              onClick={() => setActive("PUBLIC")}
            >
              Public information
            </div>
            <div
              role="button"
              className="d-flex align-items-center p-3 hover-bg"
              style={{
                height: "5rem",
                borderRadius: "0.5rem",
                background: active === "MANAGER" && "var(--color-primary)",
                color: active === "MANAGER" && "white",
              }}
              onClick={() => setActive("MANAGER")}
              data-manager-account
            >
              Manager account
            </div>
            <div
              role="button"
              className="d-flex align-items-center p-3 hover-bg"
              style={{
                height: "5rem",
                borderRadius: "0.5rem",
                background: active === "TERMS" && "var(--color-primary)",
                color: active === "TERMS" && "white",
              }}
              onClick={() => setActive("TERMS")}
              data-secure
            >
              Security and Data
            </div>
            <div
              role="button"
              className="d-flex align-items-center p-3 hover-bg"
              style={{
                height: "5rem",
                borderRadius: "0.5rem",
                background: active === "LOGOUT" && "var(--color-primary)",
                color: active === "LOGOUT" && "white",
              }}
              onClick={() => setActive("LOGOUT")}
              data-logout
            >
              Logout
            </div>
          </div>
          <div
            className="col-8 ms-5"
            style={{
              height: "25rem",
              overflowY: "auto",
            }}
          >
            {active === "PUBLIC" && renderPublicInfoContent()}
            {active === "MANAGER" && renderManagerAccountContent()}
            {active === "TERMS" && renderSecureContent()}
            {active === "LOGOUT" && renderLogoutContent()}
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <span
            role="button"
            className="me-3 p-2 text-danger"
            onClick={() => {
              close();
              setActive("PUBLIC");
            }}
          >
            Cancel
          </span>
          <button
            className="p-2 border-0"
            style={{
              background: isChange && "var(--color-primary)",
              color: isChange && "white",
              borderRadius: "0.5rem",
            }}
            onClick={() => isChange && handleUpdateUser()}
          >
            Save change
          </button>
        </div>

        {/* Export user data */}
        <CSVLink
          ref={exportData}
          data={csvData}
          filename={`${currentUser?.username}-data.csv`}
          target="_blank"
          style={{ display: "none" }}
        />
      </div>

      <div
        ref={snackBar}
        id="snackbar"
        style={{
          backgroundColor: isChange
            ? "var(--color-success)"
            : "var(--color-danger)",
        }}
        className="fw-bold"
      >
        Update {userInfo?.username} {isChange ? "successfully" : "Failed :<"}
      </div>
    </>
  );
};

export default memo(Setting, isEqual);
