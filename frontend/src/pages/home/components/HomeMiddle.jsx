import { Link } from "react-router-dom";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import "../styles/homeMiddle.css";
import "../../../styles/animations/snackbar.css";

import { getUserByID } from "../../../redux/request/userRequest";
import { LoadingPage } from "../../../pages";
import { useCurrentUser } from "../../../hooks";
import { Avatar, PostPopup } from "../../../components";
const Posts = lazy(() => import("../../../components/ui/post/Posts"));

const HomeMiddle = ({ socket }) => {
  const userDefaultValues = {
    _id: "",
    profilePicture: "",
    username: "",
  };

  const [popup, setPopup] = useState(false);
  const [user, setUser] = useState(userDefaultValues);
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();

  const handlePopup = () => {
    setPopup((popup) => !popup);
  };

  useEffect(() => {
    currentUser &&
      getUserByID(currentUser?._id, dispatch).then((data) => {
        const { _id, profilePicture, username } = data.user;

        setUser({
          _id,
          profilePicture,
          username,
        });
      });
  }, [currentUser, dispatch]);

  const renderPostPopup = () => {
    return (
      currentUser?._id &&
      popup && (
        <PostPopup
          socket={socket}
          onPopup={handlePopup}
          extendClass="animate__animated animate__fadeIn"
        />
      )
    );
  };

  return (
    <div className="middle animate__animated animate__fadeIn position-relative">
      {/* STATUS */}
      <div
        className={`create-post align-items-center mb-4 ${
          currentUser === undefined ? "d-none" : "d-flex"
        }`}
      >
        <div className="create-post-wrapper w-100 d-flex align-items-center">
          <Link
            to={currentUser ? `/user/${user?._id}` : "/"}
            className="profile-pic text-white"
            aria-label="Avatar user"
          >
            <Avatar
              imageSrc={user?.profilePicture}
              label={user?.username}
              userId={user?._id}
            />
          </Link>

          <div
            className="border-0 ps-3 me-3 ms-3 caption fs-4"
            name="caption"
            onClick={handlePopup}
            id="caption"
          >
            What's in your mind, {currentUser?.username || " user"}?
          </div>
        </div>
        <div className="submit d-flex align-items-center" title="Đăng bài viết">
          {currentUser ? (
            <button
              onClick={handlePopup}
              type="submit"
              className="btn btn-primary"
            >
              Post
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Post
            </Link>
          )}
        </div>
        {renderPostPopup()}
      </div>
      {/* END STATUS */}

      <Suspense fallback={<LoadingPage />}>
        <Posts socket={socket} />
      </Suspense>
    </div>
  );
};

export default HomeMiddle;
