import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import isEqual from "react-fast-compare";
import { useDispatch } from "react-redux";

import { getAllImagesByUser } from "../../../redux/request/imageRequest";
import ConfirmDialog from "../../ui/dialog/confirm-dialog";
import PreviewImage from "../preview/PreviewImage";
import { useDownloadImage } from "../../../hooks";

const PhotosUser = ({ userInfo }) => {
  const { userID: userRoute } = useParams();

  const dispatch = useDispatch();
  const [gallery, setGallery] = useState([]);
  const [imgSrc, setImgSrc] = useState("");
  const downloadImage = useDownloadImage(imgSrc);
  const [active, setActive] = useState("");

  const handlePreviewImage = (imgSrc) => {
    setImgSrc(imgSrc);
  };

  useEffect(() => {
    let isCancelled = false;

    getAllImagesByUser(userRoute, dispatch).then((data) => {
      if (!isCancelled) {
        setGallery(data.data);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [userRoute, dispatch]);

  const renderPreviewPopupImage = () => {
    return (
      active === "PREVIEW_IMAGE" && (
        <ConfirmDialog
          title="Download this image?"
          children={<PreviewImage imgSrc={imgSrc} />}
          onClose={() => setActive("")}
          onConfirm={downloadImage}
          confirmButtonText="Download"
        />
      )
    );
  };

  return (
    <div
      className="d-grid gap-3 py-4 position-relative"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))",
        height: "max-content",
      }}
    >
      {gallery.length > 0 ? (
        gallery.map((i) => (
          <div
            key={i._id}
            style={{
              height: "20rem",
            }}
            onClick={() => {
              setActive("PREVIEW_IMAGE");
              handlePreviewImage(i.imageUrl);
            }}
          >
            <img
              src={i.imageUrl}
              alt="user photos"
              loading="lazy"
              role="presentation"
              decoding="async"
              className="w-100"
              style={{
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
          </div>
        ))
      ) : (
        <div
          className="w-100 d-flex justify-content-center align-items-center text-white opacity-50"
          style={{
            fontSize: "5rem",
            height: "50vh",
            borderRadius: "var(--card-border-radius)",
            background: "var(--bg-container-popup)",
          }}
        >
          {userInfo.username} don't have any photos ¯\_(ツ)_/¯
        </div>
      )}

      {renderPreviewPopupImage()}
    </div>
  );
};

export default memo(PhotosUser, isEqual);
