import { memo } from "react";
import isEqual from "react-fast-compare";

const SocialLink = ({ id, title, link, isLast }) => {
  return (
    <li key={id} className={`me-1 d-flex align-items-center`}>
      <a href={link}>{title}</a>
      {!isLast && <span className="mx-2">●</span>}
    </li>
  );
};

export default memo(SocialLink, isEqual);
