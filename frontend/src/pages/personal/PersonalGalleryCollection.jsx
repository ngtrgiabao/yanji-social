import { Link, useParams } from "react-router-dom";

import "./style/personalGalleryCollection.css";

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
                        <img
                            loading="lazy"
                            role="presentation"
                            decoding="async"
                            src={photo.imageUrl}
                            alt="avatar_user"
                        />
                    ) : null}
                </Link>
            );
        });
    };

    return <div className="gallery-grid">{renderPhotos()}</div>;
};

export default PersonalGalleryCollection;
