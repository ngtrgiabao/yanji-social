import { memo } from "react";
import isEqual from "react-fast-compare";
import SocialLink from "../../ui/social-link";
import { termLinks } from "./data";

const renderSocialLinks = () =>
  termLinks.map((item, index) => (
    <SocialLink
      key={item?.id}
      id={item?.id}
      title={item?.title}
      link={item?.link}
      isLast={index === termLinks.length - 1}
    />
  ));

const TermLinks = () => {
  return (
    <ul
      className="p-3 m-0 d-flex align-items-center flex-wrap rounded-3"
      style={{ backgroundColor: "var(--color-white)" }}
    >
      {renderSocialLinks()}
    </ul>
  );
};

export default memo(TermLinks, isEqual);
