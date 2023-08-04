import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

import LoadingPage from "./pages/loading/LoadingPage";
import NetworkError from "./pages/networkError/NetworkError";

const NotFound = lazy(() => import("./pages/notFound/NotFound"));
const Homepage = lazy(() => import("./pages/home/Home"));
const MessagesPage = lazy(() => import("./pages/messages/Messages"));
const ExplorePage = lazy(() => import("./pages/explore/Explore"));
const PersonalPage = lazy(() => import("./pages/personal/Personal"));
const NotificationPage = lazy(() =>
    import("./pages/notification/Notification")
);
const BookmarkPage = lazy(() => import("./pages/bookmarks/Bookmarks"));
const FinancePage = lazy(() => import("./pages/finance/Finance"));
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
        <div className="App">
            {isNetworkWorking ? (
                <Routes>
                    <Route
                        path="*"
                        element={
                            <Suspense fallback={<LoadingPage />}>
                                <NotFound />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <Suspense fallback={<LoadingPage />}>
                                <Homepage socket={socket} />
                                {/* <LoadingPage /> */}
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
                        path="/finance"
                        element={
                            <Suspense fallback={<LoadingPage />}>
                                <FinancePage socket={socket} />
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
    );
}

export default App;
