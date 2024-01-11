import { Suspense, lazy } from "react";

import "./styles/messages.css";

import { AVA_KAYO } from "../../assets";

import Navigation from "../../shared/layout/navigation/Navigation";

import { MessageMiddle, MessageRight } from "./components";
import LoadingPage from "../loading/LoadingPage";

const MessagesLeft = lazy(() => import("./components/MessagesLeft"));

function Messages({ socket }) {
  return (
    <>
      <Navigation title="Login" link="/register" />
      <div className="messages">
        <Suspense fallback={<LoadingPage />}>
          <MessagesLeft avatarUser={AVA_KAYO} socket={socket} />
        </Suspense>

        <MessageMiddle socket={socket} />
        <MessageRight socket={socket} />
      </div>
    </>
  );
}

export default Messages;
