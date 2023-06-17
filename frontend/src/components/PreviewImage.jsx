import React from "react";

const PreviewImage = ({ imgSrc, width, heigth }) => {
    return (
        <img
            src={imgSrc}
            alt="preview_image"
            style={{
                aspectRatio: "16/9",
                objectFit: "cover",
                width: width,
                height: heigth,
            }}
        />
    );
};

export default PreviewImage;
