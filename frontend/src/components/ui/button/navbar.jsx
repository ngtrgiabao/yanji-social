import { memo } from "react";
import isEqual from "react-fast-compare";
import { Link } from "react-router-dom";

const NavBtn = ({ link, className, lable, onClick, dataAriaLabel, title }) => {
  const linkProps = {
    to: link,
    className: className,
    htmlFor: lable,
  };

  if (dataAriaLabel) {
    linkProps["data-aria-label"] = dataAriaLabel;
    linkProps["onClick"] = onClick;
  }

  return <Link {...linkProps}>{title}</Link>;
};

export default memo(NavBtn, isEqual);
