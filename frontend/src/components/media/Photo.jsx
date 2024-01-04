const Photo = ({
  imageSrc = "",
  label = "",
  videoSrc = "",
  isVideo = false,
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
        </div>
      ) : (
        <div className="photo">
          <img
            loading="lazy"
            role="presentation"
            decoding="async"
            src={imageSrc}
            alt={label}
            className="w-100 h-100"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      )}
    </>
  );
};

export default Photo;
