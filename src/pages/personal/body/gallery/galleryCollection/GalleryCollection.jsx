import React from "react";

import GalleryList from "../galleryList/GalleryList";

import "./galleryCollection.css";

const GalleryCollection = (props) => {
    const { photos } = props;
    return (
        <div className="gallery-grid">
            {photos.map((photo, index) => {
                return <img src={photo} alt="" key={index} />;
            })}
        </div>
    );
};

export default GalleryCollection;
