import { useState, useEffect } from "react";

import axios from "axios";

import "../../style/pages/personal/personalGallery.css";

import PersonalGalleryCollection from "./PersonalGalleryCollection";

import { CATS_URL } from "../../constants/api.data.constant";

const PersonalGallery = () => {
    // GET RANDOWM GALLERIES
    const [randomPhoto, setRandomPhoto] = useState([]);

    useEffect(() => {
        const getGallery = async () => {
            const photo = await axios.get(CATS_URL);

            photo.data.forEach((catPhoto) => {
                setRandomPhoto((cat) => [...cat, catPhoto.url]);
            });
        };
        getGallery();
    }, []);

    return (
        <>
            <div className="header d-flex justify-content-between">
                <a href="#" className="fw-bold fs-3">
                    Images
                </a>
                <a href="#" className="fs-3">
                    All images
                </a>
            </div>
            <div>
                <PersonalGalleryCollection photos={randomPhoto} />
            </div>
        </>
    );
};

export default PersonalGallery;