import { lazy } from "react";

import { TermAndService, CookiePolicy, PrivacyPolicy } from "../pages";

const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const _404 = lazy(() => import("../pages/_404/_404"));

// const routes = [
// { path: "/", element: <Suspense fallback={<YanjiSocialLoadingPage />} ><Homepage socket={socket} /></Suspense> },
// { path: currentUser ? "/messages" : "*", element: <Suspense fallback={<LoadingPage />} >{currentUser ? <MessagesPage socket={socket} /> : <RegisterPage />}</Suspense> },
// { path: currentUser ? "/explore" : "*", element: <Suspense fallback={<LoadingPage />} ><ExplorePage /></Suspense> },
// { path: currentUser ? "/admin" : "*", element: <Suspense fallback={<LoadingPage />} ><AdminPage /></Suspense> },
// { path: "/user/:userID", element: <Suspense fallback={<LoadingPage />} ><PersonalPage socket={socket} /></Suspense> },
// { path: "/user/:userID/:photos", element: <Suspense fallback={<LoadingPage />} ><PersonalPage socket={socket} /></Suspense> },
// { path: currentUser ? "/notification" : "*", element: <Suspense fallback={<LoadingPage />} ><NotificationPage socket={socket} /></Suspense> },
// { path: currentUser ? "/bookmarks" : "*", element: <Suspense fallback={<LoadingPage />} ><BookmarkPage socket={socket} /></Suspense> },
// { path: "/post/:postID", element: <Suspense fallback={<LoadingPage />} ><PostPreview socket={socket} /></Suspense> },
// ];

const publicRoutes = [
  { path: "/login", component: <LoginPage /> },
  { path: "/register", component: <RegisterPage /> },
  { path: "/logout", component: <LoginPage /> },
  { path: "/term-and-service", component: <TermAndService /> },
  { path: "/cookie-policy", component: <CookiePolicy /> },
  { path: "/privacy-policy", component: <PrivacyPolicy /> },
  { path: "*", component: <_404 /> },
];

export { publicRoutes }