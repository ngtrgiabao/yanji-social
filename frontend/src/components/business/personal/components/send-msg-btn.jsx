import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import isEqual from "react-fast-compare";
import { memo } from "react";

import { RouteNames } from "../../../../constant/routes";

const PersonalSendMsgBtn = ({ onClick }) => {
  return (
    <Link
      to={RouteNames.MESSAGE_PAGE}
      className="rounded rounded-circle d-flex justify-content-center align-items-center me-3 msg-btn"
      title="Message"
      onClick={onClick}
    >
      <Mail size={20} />
    </Link>
  );
};

export default memo(PersonalSendMsgBtn, isEqual);
