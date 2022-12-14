import React from "react";

import "./friendRequest.css";
import { FriendRequestData } from "../../../../data/FriendRequestData";

function FriendRequest() {
    const FriendRequestItem = (props) => {
        return (
            <div className="friend__request-item request">
                <div className="info">
                    <div className="profile-pic">
                        <img src={props.avatar} alt="" />
                    </div>
                    <div>
                        <h5>{props.name}</h5>
                        <p className="text-muted">
                            {props.numberOfMutalFriends} mutual friends
                        </p>
                    </div>
                </div>
                <div className="action d-flex">
                    <button className="btn btn-primary">Accept</button>
                    <button className="btn btn-light border-dark">
                        Decline
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="friend-request mt-3">
            <h4 className="my-3">Request</h4>

            {FriendRequestData.map((item) => (
                <FriendRequestItem
                    key={item.id}
                    avatar={item.avatar}
                    name={item.name}
                ></FriendRequestItem>
            ))}
        </div>
    );
}

export default FriendRequest;
