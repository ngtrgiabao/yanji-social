import React from "react";

const PreviewImage = (props) => {
    const { imgSrc } = props;

    return (
        <img
            src={imgSrc}
            alt="preview_image"
            style={{
                aspectRatio: "16/9",
                objectFit: "cover",
            }}
            
        />
    );
};

export default PreviewImage;
