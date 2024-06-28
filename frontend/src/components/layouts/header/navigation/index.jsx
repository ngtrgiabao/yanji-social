import { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Search } from "lucide-react";
import isEqual from "react-fast-compare";

import "./navigation.css";

import { LOGO_YANJI_SOCIAL } from "../../../../assets";

import { logout } from "../../../../redux/request/authRequest";
import { Avatar } from "../../../../components";
import NavBtn from "../../../../components/ui/button/navbar";
import { getUserByID } from "../../../../redux/request/userRequest";
import Global from "../../../../constant/global";
import { useCurrentUser } from "../../../../hooks";
import { RouteNames } from "../../../../constant/routes";

const Navigation = ({ title, link, isSearch = true }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentUser && !user?._id) {
      getUserByID(currentUser._id, dispatch)
        .then((data) => {
          setUser({
            ...data.user,
          });
        })
        .catch((error) => {
          console.error("Failed to fetch user:", error);
        });
    }
  }, [currentUser, user?._id, dispatch]);

  const handleLogout = () => {
    logout(dispatch, navigate);
  };

  const renderSwitchBtn = () => {
    return currentUser ? (
      <NavBtn
        title="Logout"
        className="btn btn-danger d-flex align-items-center justify-content-center gap-4"
        lable="#logout"
        onClick={handleLogout}
        dataAriaLabel="logout-btn"
        link={RouteNames.LOGOUT}
      />
    ) : (
      <NavBtn
        title={title}
        link={link}
        className="nav__btn d-flex align-items-center justify-content-center gap-4"
        lable="#create-post"
      />
    );
  };

  const searchUser = async (e) => {
    if (!e.target.value) {
      setUsers([]);
      return;
    }

    const value = e.target.value;

    const data = await axios.get(
      Global.SOCKET_URL +
        `/api/v1/user/all-users/?username=${value.toLowerCase()}`,
    );

    const userList = data.data?.users;

    if (userList.length > 0) {
      setUsers(userList);
    } else {
      setUsers([]);
    }
  };

  return (
    <>
      <nav className="py-3 header-navbar">
        <div className="container d-flex align-items-center h-100">
          <Link
            to={RouteNames.HOME}
            className="logo mb-0 d-flex align-items-center"
          >
            <img
              src={LOGO_YANJI_SOCIAL}
              alt=""
              className="profile-pic me-3 border border-2 border-white"
            />
            <span>Yanji Social</span>
          </Link>

          {isSearch && (
            <div className="search-bar d-flex align-items-center position-relative ">
              <Search size={15} />
              <Form.Control
                className="ms-4"
                type="search"
                placeholder="Search for creators, ideas and projects"
                style={{
                  boxShadow: "none",
                }}
                onChange={(e) => searchUser(e)}
              />

              <div
                className="position-absolute w-100 text-white overflow-auto"
                style={{
                  left: "0",
                  top: "110%",
                  maxHeight: "30rem",
                }}
              >
                {users.map((u) => (
                  <Link
                    to={`/user/${u._id}`}
                    className="d-flex align-items-center p-3 fs-5 text-white"
                    style={{
                      background: "var(--color-primary-light)",
                    }}
                    key={u._id}
                  >
                    <div className="profile-pic d-flex justify-content-center align-items-center me-3">
                      <Avatar imageSrc={u.profilePicture} label={u.username} />
                    </div>
                    {u.username}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="d-flex justify-content-end align-items-center">
            {renderSwitchBtn()}
            {currentUser && (
              <Link
                aria-label="Avatar user"
                to={currentUser ? `/user/${user?._id}` : RouteNames.HOME}
                className={`profile-pic ms-4 ${
                  Global.ADMIN_ID === currentUser?._id ? "" : "bg-light"
                } text-white`}
              >
                <Avatar
                  imageSrc={user?.profilePicture}
                  label={user?.username}
                  userId={currentUser?._id}
                />
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default memo(Navigation, isEqual);
