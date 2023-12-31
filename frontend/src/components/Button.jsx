import { Link } from "react-router-dom";

const Button = ({
  label = "",
  icon,
  path = "",
  name = "",
  setActive,
  active = "",
  isReadNotification = false,
}) => {
  return (
    <>
      {path ? (
        <Link
          to={path}
          className={`menu-item ${active === name ? "active" : ""}`}
          onClick={() => setActive(name)}
          title={label}
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
          <h3 className="ms-3">{label}</h3>
        </Link>
      ) : (
        <div
          className={`menu-item ${active === name ? "active" : ""}`}
          onClick={() => setActive(name)}
          title={label}
        >
          <span>{icon}</span>
          <h3 className="ms-3">{label}</h3>
        </div>
      )}
    </>
  );
};

export default Button;
