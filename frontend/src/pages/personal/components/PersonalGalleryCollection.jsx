import { Link, useParams } from "react-router-dom";

import "../styles/personalGalleryCollection.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PersonalGalleryCollection = ({ photos }) => {
  const { userID: userRoute } = useParams();

  const renderPhotos = () => {
    return Array.from({ length: 9 }, (_, index) => {
      const photo = photos[index];

      return (
        <Link
          to={`/user/${userRoute}/photos`}
          key={index}
          className="gallery-image d-flex justify-content-center align-items-center"
          style={{
            background: "var(--light-dark)",
          }}
        >
          {photo?.imageUrl ? (
            <LazyLoadImage alt="avatar_user" src={photo.imageUrl} />
          ) : null}
        </Link>
      );
    });
  };

  return <div className="gallery-grid">{renderPhotos()}</div>;
};

export default PersonalGalleryCollection;
