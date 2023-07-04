import { Suspense, lazy, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

import LoadingPage from "./pages/loading/LoadingPage";
import NetworkError from "./pages/networkError/NetworkError";

const _404 = lazy(() => import("./pages/notFound/NotFound"));
const Homepage = lazy(() => import("./pages/home/Home"));
const MessagesPage = lazy(() => import("./pages/messages/Messages"));
const ExplorePage = lazy(() => import("./pages/explore/Explore"));
const PersonalPage = lazy(() => import("./pages/personal/Personal"));
const NotificationPage = lazy(() =>
    import("./pages/notification/Notification")
);

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

    return (
        <div className="App">
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
                        <Suspense fallback={<LoadingPage />}>
                            <Homepage socket={socket} />
                        </Suspense>
                    }
                />
                <Route
                    path="/messages"
                    element={
                        <Suspense fallback={<LoadingPage />}>
                            {currentUser ? <MessagesPage /> : <RegisterPage />}
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
                    // path={"/user" + `/${currentUser._id}`}
                    path={"/user/:userID"}
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
                            <NotificationPage />
                        </Suspense>
                    }
                />

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
        </div>
    );
}

export default App;
