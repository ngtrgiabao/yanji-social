import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const PersonalSendMsgBtn = ({ onClick }) => {
  return (
    <Link
      to="/messages"
      className="rounded rounded-circle d-flex justify-content-center align-items-center me-3 msg-btn"
      title="Message"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faEnvelope} className="fs-3" />
    </Link>
  );
};

export default PersonalSendMsgBtn;
