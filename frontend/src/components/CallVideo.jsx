import { useEffect, useState } from "react";
import { MeetingProvider, MeetingConsumer } from "@videosdk.live/react-sdk";

import { authToken, createMeeting } from "../services/meeting.service";

const CallVideo = () => {
    const [meetingID, setMeetingID] = useState(null);

    // const getMeetingAndToken = async () => {
    //     const t = await createMeeting({ token: authToken });
    //     console.log(t)
    // };

    // useEffect(() => {
    //     getMeetingAndToken();
    // }, []);

    return (
        <div
            className="position-absolute top-100"
            style={{
                left: "0",
            }}
        ></div>
    );
};

export default CallVideo;
