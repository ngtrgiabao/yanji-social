import "./styles/messages.css";

import { RouteNames } from "../../../constant/routes";
import Header from "../../layouts/header";
import Left from "./components/left";
import Right from "./components/right";
import Middle from "./components/middle";

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

export default Messages;
