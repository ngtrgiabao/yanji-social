import "./style/loading.css";

import { LOGO_YANJI_SOCIAL } from "../../assets";

const LoadingPage = () => {
  return (
    <div
      id="loading-page"
      className="d-flex justify-content-center align-items-center fs-4"
    >
      <div className="w-25 h-25 d-flex justify-content-center align-items-center mb-3">
        <img src={LOGO_YANJI_SOCIAL} alt="" />
      </div>
      <span
        className="fw-bold"
        style={{
          fontSize: "3rem",
        }}
      >
        Yanji Social
      </span>
    </div>
  );
};

export default LoadingPage;
