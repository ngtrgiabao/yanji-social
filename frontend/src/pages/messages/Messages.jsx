import { Suspense, lazy } from "react";

import "../../style/pages/messages/messages.css";

import KAYO_AVATAR from "../../assets/avatar/kayo.jpg";

import Navigation from "../../layout/navigation/Navigation";

import Middle from "./sidebar/middle/Middle";
import Right from "./sidebar/right/Right";
import LoadingPage from "../loading/LoadingPage";

const Left = lazy(() => import("./sidebar/left/Left"));

function Messages() {
    return (
        <>
            <Navigation title="Login" link="/register" />
            <div className="messages">
                <Suspense fallback={<LoadingPage />}>
                    <Left avatarUser={KAYO_AVATAR} />
                </Suspense>

                <Middle />
                <Right />
            </div>
        </>
    );
}

export default Messages;
