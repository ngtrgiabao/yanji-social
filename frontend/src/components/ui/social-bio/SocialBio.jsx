import { memo } from "react";
import isEqual from "react-fast-compare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialBio = ({ icon, link, username }) => {
  return (
    <div className="d-flex align-items-center my-3 fs-3">
      <FontAwesomeIcon icon={icon} />
      <p className="ms-3 m-0">
        {link ? (
          <a
            className={`m-0 link ${link || username ? "link__color" : ""}`}
            href={link || "#"}
          >
            {username}
          </a>
        ) : (
          <span className={`m-0 link`}>{username}</span>
        )}
      </p>
    </div>
  );
};

export default memo(SocialBio, isEqual);
