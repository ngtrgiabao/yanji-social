import React from "react";

import "./galleryCollection.css";

const GalleryCollection = (props) => {
    const { photos } = props;
    return (
        <div className="gallery-grid">
            {photos.map((photo, index) => {
                return (
                    <div key={index}>
                        <img src={photo} alt="image" />
                    </div>
                );
            })}
        </div>
    );
};

export default GalleryCollection;
