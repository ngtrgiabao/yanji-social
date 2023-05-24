import "../../style/pages/messages/messages.css";

import KAYO_AVATAR from "../../assets/avatar/kayo.jpg";

import Navigation from "../../layout/navigation/Navigation";
import Left from "./sidebar/left/Left";
import Middle from "./sidebar/middle/Middle";
import Right from "./sidebar/right/Right";

function Messages() {
    return (
        <>
            <Navigation title="Login" link="/register" />
            <div className="messages">
                <Left avatarUser={KAYO_AVATAR} />
                <Middle />
                <Right />
            </div>
        </>
    );
}

export default Messages;
