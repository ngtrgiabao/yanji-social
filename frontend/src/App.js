import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import { isMobile, isTablet } from "react-device-detect";

import Global from "./helpers/constants/global";
import { useCurrentUser } from "./hooks";
import 'animate.css';

import {
  LoadingPage,
  YanjiSocialLoadingPage,
  NetworkError,
} from "./pages";
import { publicRoutes } from "./routes/all-routes";

const InvalidScreen = lazy(() => import("./components/ui/invalid-screen/InvalidScreen"));
const Homepage = lazy(() => import("./pages/home/Home"));
const MessagesPage = lazy(() => import("./pages/messages/Messages"));
const ExplorePage = lazy(() => import("./pages/explore/Explore"));
const PersonalPage = lazy(() => import("./pages/personal/Personal"));
const NotificationPage = lazy(
  () => import("./pages/notification/Notification"),
);
const BookmarkPage = lazy(() => import("./pages/bookmarks/Bookmarks"));
const PostPreview = lazy(() => import("./pages/postPreview/PostPreview"));
const AdminPage = lazy(() => import("./pages/admin/Admin"));

const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));

function App() {
  const currentUser = useCurrentUser();
  const socketRef = useRef(null);
  const socket = socketRef.current;
  const [isNetworkWorking, setIsNetworkWorking] = useState(navigator.onLine);

  useEffect(() => {
    socketRef.current = io(Global.SOCKET_URL);
  }, [Global.SOCKET_URL]);

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
        <InvalidScreen />
      ) : (
        <div className="App">
          {isNetworkWorking ? (
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback={<YanjiSocialLoadingPage />}>
                    <Homepage socket={socket} />
                  </Suspense>
                }
              />
              <Route
                path={currentUser ? "/messages" : "*"}
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
                path={currentUser ? "/explore" : "*"}
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <ExplorePage />
                  </Suspense>
                }
              />
              <Route
                path={currentUser ? "/admin" : "*"}
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <AdminPage />
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
                path={currentUser ? "/notification" : "*"}
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <NotificationPage socket={socket} />
                  </Suspense>
                }
              />
              <Route
                path={currentUser ? "/bookmarks" : "*"}
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

              {
                publicRoutes.map((route, idx) => (
                  <Route
                    key={idx}
                    path={route.path}
                    element={
                      <Suspense fallback={<LoadingPage />}>
                        {route.component}
                      </Suspense>
                    }
                  />
                ))
              }
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
