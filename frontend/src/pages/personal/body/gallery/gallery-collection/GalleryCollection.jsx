import React from "react";

import "../../../../../style/pages/personal/body/gallery/galleryCollection/galleryCollection.css";

const GalleryCollection = (props) => {
    const { photos } = props;
    return (
        <div className="gallery-grid">
            {photos.map((photo, index) => {
                return (
                    <div key={index}>
                        <img
                            loading="lazy"
                            role="presentation"
                            decoding="async"
                            src={photo}
                            alt="Cat image"
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default GalleryCollection;
