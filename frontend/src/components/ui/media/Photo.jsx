import { Link } from "react-router-dom";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";

const Photo = ({
  imageSrc = "",
  label = "",
  videoSrc = "",
  isVideo = false,
  postID = "",
}) => {
  return (
    <>
      {isVideo ? (
        <div
          className="photo"
          style={{
            height: "30rem",
          }}
        >
          <LazyLoadComponent>
            <video
              preload="metadata"
              className="w-100"
              controls
              draggable="false"
              muted
              autoPlay
              loop
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </LazyLoadComponent>
        </div>
      ) : (
        <Link
          to={`/post/${postID}`}
          className="photo"
          style={{
            width: "calc(100%)",
          }}
        >
          <LazyLoadImage
            alt={label}
            src={imageSrc}
            effect="blur"
            className="w-100 h-100"
            height={"100%"}
          />
        </Link>
      )}
    </>
  );
};

export default Photo;
