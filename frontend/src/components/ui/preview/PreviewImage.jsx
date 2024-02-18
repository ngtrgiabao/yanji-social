import { LOGO_YANJI_SOCIAL } from "../../../assets";

const PreviewImage = ({ imgSrc, width, heigth }) => {
  return imgSrc ? (
    <img
      src={imgSrc}
      loading="lazy"
      role="presentation"
      decoding="async"
      alt="preview_image"
      style={{
        aspectRatio: "16/9",
        objectFit: "cover",
        width: width,
        height: heigth,
      }}
    />
  ) : (
    <img
      src={LOGO_YANJI_SOCIAL}
      loading="lazy"
      role="presentation"
      decoding="async"
      alt="preview_image"
      style={{
        aspectRatio: "16/9",
        objectFit: "cover",
        width: width,
        height: heigth,
      }}
    />
  );
};

export default PreviewImage;
