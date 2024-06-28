import { lazy } from "react";
import {
  CookiePolicyPage,
  PrivacyPolicyPage,
  TermAndServicePage,
} from "../pages";
import { RouteNames } from "../constant/routes";

const Homepage = lazy(() => import("../pages/home"));
const MessagesPage = lazy(() => import("../pages/messages"));
const PersonalPage = lazy(() => import("../pages/personal"));
const NotificationPage = lazy(() => import("../pages/notification"));
const BookmarkPage = lazy(() => import("../pages/bookmarks"));
const PostPreview = lazy(() => import("../pages/post-preview"));
const AdminPage = lazy(() => import("../pages/admin/Admin"));

const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const ExplorePage = lazy(() => import("../pages/explore"));

const authProtectedRoutes = [
  {
    path: RouteNames.HOME,
    component: Homepage,
    isSocket: true,
  },
  {
    path: RouteNames.MESSAGE_PAGE,
    component: MessagesPage,
    isSocket: true,
  },
  {
    path: RouteNames.ADMIN,
    component: AdminPage,
    isSocket: false,
  },
  {
    path: RouteNames.PERSONAL_PAGE,
    component: PersonalPage,
    isSocket: true,
  },
  {
    path: RouteNames.PERSONAL_PHOTOS,
    component: PersonalPage,
    isSocket: true,
  },
  {
    path: RouteNames.NOTIFICATION,
    component: NotificationPage,
    isSocket: true,
  },
  {
    path: RouteNames.BOOKMARKS,
    component: BookmarkPage,
    isSocket: true,
  },
  {
    path: RouteNames.POST_PREVIEW,
    component: PostPreview,
    isSocket: true,
  },
];

const publicRoutes = [
  { path: RouteNames.LOGIN, component: LoginPage },
  { path: RouteNames.REGISTER, component: RegisterPage },
  { path: RouteNames.LOGOUT, component: LoginPage },
  { path: RouteNames.TERM_AND_SERVICE, component: TermAndServicePage },
  { path: RouteNames.COOKIE_POLICY, component: CookiePolicyPage },
  { path: RouteNames.PRIVACY_POLICY, component: PrivacyPolicyPage },
  { path: RouteNames.EXPLORE, component: ExplorePage },
];

export { publicRoutes, authProtectedRoutes };
