import { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import isEqual from "react-fast-compare";
import { Link, useParams } from "react-router-dom";

import "../styles/personalGallery.css";

import { PersonalGalleryCollection } from "../components";
import { fetchUserSpecificImageQuantity } from "../../../../redux/request/userRequest";

const PersonalGallery = () => {
  const { userID: userRoute } = useParams();

  const [galleryImages, setGalleryImages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = {
      userID: userRoute,
      limit: 9,
    };

    fetchUserSpecificImageQuantity(user, dispatch).then((data) => {
      data && setGalleryImages(data.data);
    });
  }, [userRoute, dispatch]);

  return (
    <>
      <div className="header d-flex justify-content-between mt-5">
        <span className="fw-bold fs-3">Images</span>
        <Link to={`/user/${userRoute}/photos`} className="fs-3">
          All images
        </Link>
      </div>
      <PersonalGalleryCollection photos={galleryImages} />
    </>
  );
};

export default memo(PersonalGallery, isEqual);
