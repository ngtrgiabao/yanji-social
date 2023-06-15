import React from "react";

const PreviewImage = (props) => {
    const { imgSrc, width, heigth } = props;

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
