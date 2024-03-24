import { memo } from "react";

import { LOGO_YANJI_SOCIAL } from "../../../assets";
import Global from "../../../helpers/constants/global";
import { LazyLoadImage } from 'react-lazy-load-image-component';

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

export default memo(Avatar);
