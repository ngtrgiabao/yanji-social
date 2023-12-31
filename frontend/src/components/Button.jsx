const Button = ({ label, icon, path, key, setActive, currentUser, active }) => {
  return (
    <>
      {path ? (
        <Link
          to={currentUser ? path : "/"}
          className={`menu-item ${active === key ? "active" : ""}`}
          onClick={() => setActive(key)}
          title={label}
          key={key}
        >
          <span>{icon}</span>
          <h3 className="ms-3">{label}</h3>
        </Link>
      ) : (
        <div
          className={`menu-item ${active === key ? "active" : ""}`}
          onClick={() => setActive(key)}
          title={label}
          key={key}
        >
          <span>{icon}</span>
          <h3 className="ms-3">{label}</h3>
        </div>
      )}
    </>
  );
};

export default Button;
