import React, { useState, useEffect } from "react";

import axios from "axios";

import "../../../../style/pages/personal/body/gallery/gallery.css";

import GalleryCollection from "./gallery-collection/GalleryCollection";

import API from "../../../../api/api";

function Gallery() {
    // GET RANDOWM GALLERIES
    const [randomPhoto, setRandomPhoto] = useState([]);

    useEffect(() => {
        const getGallery = async () => {
            const photo = await axios.get(API.CATS_URL.url);

            photo.data.forEach((catPhoto) => {
                setRandomPhoto((cat) => [...cat, catPhoto.url]);
            });
        };
        return getGallery;
    }, []);

    return (
        <div>
            <div className="header d-flex justify-content-between">
                <a href="#" className="fw-bold fs-3">
                    Images
                </a>
                <a href="#" className="fs-3">
                    All images
                </a>
            </div>
            <div>
                <GalleryCollection photos={randomPhoto} />
            </div>
        </div>
    );
}

export default Gallery;
