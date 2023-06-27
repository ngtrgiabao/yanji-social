import "../../style/pages/personal/personalGalleryCollection.css";

const PersonalGalleryCollection = ({ photos }) => {
    const renderPhotos = () => {
        return photos.map((photo, index) => {
            return (
                <div key={index} className="gallery-image w-100 h-100">
                    <img
                        loading="lazy"
                        role="presentation"
                        decoding="async"
                        src={photo}
                        alt="Cat image"
                    />
                </div>
            );
        });
    };

    return <div className="gallery-grid">{renderPhotos()}</div>;
};

export default PersonalGalleryCollection;
