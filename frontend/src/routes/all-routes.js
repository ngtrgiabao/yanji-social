import { lazy } from "react";
import { CookiePolicy, PrivacyPolicy, TermAndService } from "../pages";

const Homepage = lazy(() => import("../pages/home/Home"));
const MessagesPage = lazy(() => import("../pages/messages/Messages"));
const PersonalPage = lazy(() => import("../pages/personal/Personal"));
const NotificationPage = lazy(
  () => import("../pages/notification/Notification"),
);
const BookmarkPage = lazy(() => import("../pages/bookmarks/Bookmarks"));
const PostPreview = lazy(() => import("../pages/postPreview/PostPreview"));
const AdminPage = lazy(() => import("../pages/admin/Admin"));

const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const ExplorePage = lazy(() => import("../pages/explore/Explore"));

const authProtectedRoutes = [
  {
    path: "/",
    component: Homepage,
    isSocket: true,
  },
  {
    path: "/messages",
    component: MessagesPage,
    isSocket: true,
  },
  {
    path: "/admin",
    component: AdminPage,
    isSocket: false,
  },
  {
    path: "/user/:userID",
    component: PersonalPage,
    isSocket: true,
  },
  {
    path: "/user/:userID/:photos",
    component: PersonalPage,
    isSocket: true,
  },
  {
    path: "/notification",
    component: NotificationPage,
    isSocket: true,
  },
  {
    path: "/bookmarks",
    component: BookmarkPage,
    isSocket: true,
  },
  {
    path: "/post/:postID",
    component: PostPreview,
    isSocket: true,
  },
];

const publicRoutes = [
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/logout", component: LoginPage },
  { path: "/term-and-service", component: TermAndService },
  { path: "/cookie-policy", component: CookiePolicy },
  { path: "/privacy-policy", component: PrivacyPolicy },
  { path: "/explore", component: ExplorePage },
];

export { publicRoutes, authProtectedRoutes };
