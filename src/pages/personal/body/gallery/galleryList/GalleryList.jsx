import React from "react";

const GalleryList = (props) => {
    const { image } = props;

    return <img src={image} alt="" />;
};

export default GalleryList;
