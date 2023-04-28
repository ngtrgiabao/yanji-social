import React from "react";

import "../../../../style/pages/personal/body/stories/stories.css";
import imgStory1 from "../../../../assets/stories-images/imgStory1.jpg";
import imgStory2 from "../../../../assets/stories-images/imgStory2.jpg";
import imgStory3 from "../../../../assets/stories-images/imgStory3.jpg";

function Stories() {
    const stories = [
        {
            id: 1,
            imgURL: imgStory1,
            title: "Sing 🎤",
        },
        {
            id: 2,
            imgURL: imgStory2,
            title: "MEMORIES",
        },
        {
            id: 3,
            imgURL: imgStory3,
            title: "ME",
        },
    ];

    return (
        <div>
            <div className="row p-0 stories-row gap-3 mx-1">
                {stories.map((item) => (
                    <div key={item.id} className="col text-center">
                        <span>
                            <img src={item.imgURL} alt="" />
                        </span>
                        <div className="title mt-2 fs-4">
                            <p className="d-inline-block">{item.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Stories;
