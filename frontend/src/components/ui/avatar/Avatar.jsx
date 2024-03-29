import { LOGO_YANJI_SOCIAL } from "../../../assets";
import Global from "../../../helpers/constants/global";

const Avatar = ({
  imageSrc = "",
  label = "",
  customClass = "",
  customAttrs,
  fontSize,
  userId = "",
}) => {
  return (
    <div
      className={`profile-pic text-white ${userId === Global.ADMIN_ID ? "border border-3 border-danger" : ""
        } ${fontSize ? fontSize : "fs-5"
        } text-uppercase w-100 h-100 ${customClass}`}
      {...customAttrs}
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