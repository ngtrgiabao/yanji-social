import { memo } from "react";
import isEqual from "react-fast-compare";
import { Link } from "react-router-dom";

const Button = ({
  label = "",
  icon,
  path = "",
  name = "",
  setActive,
  active = "",
  isReadNotification = false,
  newtab = false,
}) => {
  return (
    <>
      {path ? (
        <Link
          to={path}
          className={`menu-item hover-bg ${active === name ? "active" : ""}`}
          onClick={() => setActive(name)}
          title={label}
          target={newtab ? "_blank" : ""}
        >
          <span>
            {icon}
            {isReadNotification && (
              <small
                className="notification-count bg-danger"
                style={{
                  display: `${active === name ? "none" : ""}`,
                }}
              ></small>
            )}
          </span>
          <h3 className="ms-3 mb-0">{label}</h3>
        </Link>
      ) : (
        <div
          className={`menu-item hover-bg ${active === name ? "active" : ""}`}
          onClick={() => setActive(name)}
          title={label}
        >
          <span>{icon}</span>
          <h3 className="ms-3 mb-0">{label}</h3>
        </div>
      )}
    </>
  );
};

export default memo(Button, isEqual);
