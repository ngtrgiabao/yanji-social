import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getUserByID } from "../redux/request/userRequest";

const ChatOnline = (props) => {
    const { onlineUsers, currentUser } = props;

    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getUserByID(dispatch, currentUser).then((data) => {
            setFriends(data.user.friends);
        });
    }, [currentUser]);

    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f)));
    }, [friends, onlineUsers]);

    return (
        <div>
            {/* {onlineFriends.map((o, index) => (
                <div key={index}>hello {o}</div>
            ))} */}
        </div>
    );
};

export default ChatOnline;
