import { Suspense, lazy } from "react";

import "./style/messages.css";

import { AVA_KAYO } from "../../assets";

import Navigation from "../../shared/layout/navigation/Navigation";

import MessagesMiddle from "./MessagesMiddle";
import MessagesRight from "./MessagesRight";
import LoadingPage from "../loading/LoadingPage";

const MessagesLeft = lazy(() => import("./MessagesLeft"));

function Messages({ socket }) {
  return (
    <>
      <Navigation title="Login" link="/register" />
      <div className="messages">
        <Suspense fallback={<LoadingPage />}>
          <MessagesLeft avatarUser={AVA_KAYO} socket={socket} />
        </Suspense>

        <MessagesMiddle socket={socket} />
        <MessagesRight socket={socket} />
      </div>
    </>
  );
}

export default Messages;
