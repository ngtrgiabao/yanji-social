import React from "react";
import { StoryData } from "../../../data/StoryData";
import "./stories.css"

function Stories() {
    const StoryItem = (props) => {
        return (
            <div className="story-item story">
                <div className="profile-pic">
                    <img src={props.avatar} alt="" />
                </div>
                <p className="name">{props.name}</p>
            </div>
        );
    };

    return (
        <div className="stories d-flex justify-content-between">
            {StoryData.map((item) => (
                <StoryItem
                    key={item.id}
                    avatar={item.avatar}
                    name={item.name}
                ></StoryItem>
            ))}
        </div>
    );
}

export default Stories;
