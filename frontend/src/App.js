import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { isMobile, isTablet } from "react-device-detect";

import { BG_NOT_AVAILABLE } from "./assets";

import {
  LoadingPage,
  YanjiSocialLoadingPage,
  NetworkError,
  TermAndService,
  CookiePolicy,
  PrivacyPolicy,
} from "./pages";

const _404 = lazy(() => import("./pages/_404/_404"));
const Homepage = lazy(() => import("./pages/home/Home"));
const MessagesPage = lazy(() => import("./pages/messages/Messages"));
const ExplorePage = lazy(() => import("./pages/explore/Explore"));
const PersonalPage = lazy(() => import("./pages/personal/Personal"));
const NotificationPage = lazy(
  () => import("./pages/notification/Notification"),
);
const BookmarkPage = lazy(() => import("./pages/bookmarks/Bookmarks"));
const PostPreview = lazy(() => import("./pages/postPreview/PostPreview"));

const RegisterPage = lazy(() => import("./pages/form/RegisterPage"));
const LoginPage = lazy(() => import("./pages/form/LoginPage"));

function App() {
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser?.data._id;
  });

  const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
  const socketRef = useRef(null);
  const socket = socketRef.current;

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);
  }, [SOCKET_URL]);

  const [isNetworkWorking, setIsNetworkWorking] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsNetworkWorking(true);
    };

    const handleOffline = () => {
      setIsNetworkWorking(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [isNetworkWorking]);

  return (
    <>
      {isMobile || isTablet ? (
        <div
          className="text-white bg-center bg-cover d-flex justify-content-center align-items-center text-center"
          style={{
            background: `url(${BG_NOT_AVAILABLE}) no-repeat center`,
            height: "100vh",
            scale: "1.2",
          }}
        >
          <div
            className="bg-black w-fit p-5 fs-6"
            style={{
              borderRadius: "1rem",
            }}
          >
            <p className="fw-bold">
              Yanji Social is not available on mobile or tablet now 🫠
            </p>
            <p className="mt-2 font-thin">
              We will update in another version soon
            </p>
          </div>
        </div>
      ) : (
        <div className="App">
          {isNetworkWorking ? (
            <Routes>
              <Route
                path="*"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <_404 />
                  </Suspense>
                }
              />
              <Route
                path="/"
                element={
                  <Suspense fallback={<YanjiSocialLoadingPage />}>
                    <Homepage socket={socket} />
                  </Suspense>
                }
              />
              <Route
                path="/messages"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    {currentUser ? (
                      <MessagesPage socket={socket} />
                    ) : (
                      <RegisterPage />
                    )}
                  </Suspense>
                }
              />
              <Route
                path="/explore"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <ExplorePage />
                  </Suspense>
                }
              />
              <Route
                path={"/user/:userID"}
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <PersonalPage socket={socket} />
                  </Suspense>
                }
              />
              <Route
                path={"/user/:userID/:photos"}
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <PersonalPage socket={socket} />
                  </Suspense>
                }
              />
              <Route
                path="/notification"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <NotificationPage socket={socket} />
                  </Suspense>
                }
              />
              <Route
                path="/bookmarks"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <BookmarkPage socket={socket} />
                  </Suspense>
                }
              />
              <Route
                path="/post/:postID"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <PostPreview socket={socket} />
                  </Suspense>
                }
              />

              {/* term */}
              <Route
                path="/term-and-service"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <TermAndService />
                  </Suspense>
                }
              />
              <Route
                path="/cookie-policy"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <CookiePolicy />
                  </Suspense>
                }
              />
              <Route
                path="/privacy-policy"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <PrivacyPolicy />
                  </Suspense>
                }
              />

              {/* Form */}
              <Route
                path="/register"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <RegisterPage />
                  </Suspense>
                }
              />
              <Route
                path="/login"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <LoginPage />
                  </Suspense>
                }
              />
              <Route
                path="/logout"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <LoginPage />
                  </Suspense>
                }
              />
            </Routes>
          ) : (
            <NetworkError />
          )}
        </div>
      )}
    </>
  );
}

export default App;
