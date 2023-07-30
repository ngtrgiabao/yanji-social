import "../../style/pages/personal/personalGalleryCollection.css";

const PersonalGalleryCollection = ({ photos }) => {
    const renderPhotos = () => {
        return Array.from({ length: 9 }, (_, index) => {
            const photo = photos[index];

            return (
                <div
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
                </div>
            );
        });
    };

    return <div className="gallery-grid">{renderPhotos()}</div>;
};

export default PersonalGalleryCollection;
