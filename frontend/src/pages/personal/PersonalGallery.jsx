import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import "../../style/pages/personal/personalGallery.css";

import PersonalGalleryCollection from "./PersonalGalleryCollection";
import { fetchUserSpecificImageQuantity } from "../../redux/request/userRequest";

const PersonalGallery = ({ userInfo }) => {
    const [galleryImages, setGalleryImages] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const user = {
            userID: userInfo?._id,
            limit: 9,
        };

        fetchUserSpecificImageQuantity(user, dispatch).then((data) => {
            data && setGalleryImages(data.data);
        });
    }, [userInfo?._id, dispatch]);

    return (
        <>
            <div className="header d-flex justify-content-between mt-5">
                <span className="fw-bold fs-3">Images</span>
                <a href="#" className="fs-3">
                    All images
                </a>
            </div>
            <PersonalGalleryCollection photos={galleryImages} />
        </>
    );
};

export default PersonalGallery;
