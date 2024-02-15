import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const PersonalSendMsgBtn = ({ onClick }) => {
  return (
    <Link
      to="/messages"
      className="rounded rounded-circle d-flex justify-content-center align-items-center me-3 msg-btn"
      title="Message"
      onClick={onClick}
    >
      <Mail size={20} />
    </Link>
  );
};

export default PersonalSendMsgBtn;
