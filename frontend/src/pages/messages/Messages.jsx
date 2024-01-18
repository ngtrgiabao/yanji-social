import { Suspense, lazy } from "react";

import "./styles/messages.css";

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
          <MessagesLeft socket={socket} />
        </Suspense>

        <MessageMiddle socket={socket} />
        <MessageRight socket={socket} />
      </div>
    </>
  );
}

export default Messages;
