import { memo } from "react";
import isEqual from "react-fast-compare";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PersonalBanner = ({ bannerUrl }) => {
  return bannerUrl ? (
    <LazyLoadImage alt="background" src={bannerUrl} />
  ) : (
    <span className="fs-4">Don't have wallpaper</span>
  );
};

export default memo(PersonalBanner, isEqual);
