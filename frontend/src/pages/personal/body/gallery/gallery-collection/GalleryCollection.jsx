import "../../../../../style/pages/personal/body/gallery/galleryCollection/galleryCollection.css";

const GalleryCollection = (props) => {
    const { photos } = props;
    const renderPhotos = () => {
        return photos.map((photo, index) => {
            return (
                <div key={index}>
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

export default GalleryCollection;
