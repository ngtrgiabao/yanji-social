import { memo } from "react";
import isEqual from "react-fast-compare";

import { RouteNames } from "../../../constant/routes";
import Header from "../../layouts/header";
import Left from "./components/left";
import Right from "./components/right";
import Middle from "./components/middle";

import "./styles/messages.css";

function Messages({ socket }) {
  return (
    <>
      <Header title="Login" link={RouteNames.REGISTER} />
      <div className="messages">
        <Left socket={socket} />
        <Middle socket={socket} />
        <Right socket={socket} />
      </div>
    </>
  );
}

export default memo(Messages, isEqual);
