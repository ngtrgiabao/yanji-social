import { LOGO_YANJI_SOCIAL } from "../../assets";

const Avatar = ({ imageSrc = "", label = "", customClass = "" }) => {
  return (
    <div
      className={`profile-pic text-white fs-5 text-uppercase w-100 h-100 ${customClass}`}
    >
      {imageSrc ? (
        <img
          loading="lazy"
          role="presentation"
          decoding="async"
          src={imageSrc || LOGO_YANJI_SOCIAL}
          alt={label}
          className="w-100"
        />
      ) : (
        <>{label.split("")[0]}</>
      )}
    </div>
  );
};

export default Avatar;
