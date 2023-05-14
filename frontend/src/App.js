import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import LoadingPage from "./pages/loading/LoadingPage";
import NetworkError from "./pages/networkError/NetworkError";

const Homepage = lazy(() => import("./pages/home/Home"));
const MessagesPage = lazy(() => import("./pages/messages/Messages"));
const ExplorePage = lazy(() => import("./pages/explore/Explore"));
const PersonalPage = lazy(() => import("./pages/personal/Personal"));

const RegisterPage = lazy(() => import("./pages/form/register/RegisterPage"));
const LoginPage = lazy(() => import("./pages/form/login/LoginPage"));

function App() {
    const userID = useSelector((state) => {
        return state.auth.login.currentUser?.data._id;
    });

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <Suspense fallback={<LoadingPage />}>
                            <Homepage />
                        </Suspense>
                    }
                />
                <Route
                    path="/messages"
                    element={
                        <Suspense fallback={<LoadingPage />}>
                            <MessagesPage />
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
                    path={"/user" + `/${userID}`}
                    element={
                        <Suspense fallback={<LoadingPage />}>
                            <PersonalPage />
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
