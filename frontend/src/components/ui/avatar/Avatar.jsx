import { LOGO_YANJI_SOCIAL } from "../../../assets";
import Global from "../../../helpers/constants/global";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const avatarContainerStyle = (userId, fontSize,  customClass) => {
  const isAdmin = userId === Global.ADMIN_ID;
  return `
    profile-pic text-white ${isAdmin ? "border border-3 border-danger" : "" }
    ${fontSize ? fontSize : "fs-5" } text-uppercase w-100 h-100 ${customClass}
  `
}

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
      className={avatarContainerStyle(userId, fontSize, customClass)}
      {...customAttrs}
    >
      {imageSrc ? (
          <LazyLoadImage
              effect="blur"
              alt={label}
              src={imageSrc ? imageSrc : LOGO_YANJI_SOCIAL}
              className="w-100 h-100"
              height={"100%"}
              style={{
                objectFit: "cover"
              }}
          />
      ) : (
        <>{label.split("")[0]}</>
      )}
    </div>
  );
};

export default Avatar;
