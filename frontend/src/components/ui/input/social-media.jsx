import React, { memo } from "react";
import isEqual from "react-fast-compare";

const SocialMediaInput = ({ icon, label, value, onChange }) => {
  return (
    <div className="d-flex flex-column align-items-start mb-4">
      <label htmlFor={label} className="mb-2 fw-bold d-flex align-items-center">
        {icon}
        {label}
      </label>
      <div className="w-100 d-flex">
        <div
          className="d-flex justify-content-center align-items-center p-3"
          style={{
            width: "max-content",
            height: "4rem",
            background: "var(--color-primary)",
          }}
        >
          username
        </div>
        <input
          name={label}
          value={value}
          onChange={onChange}
          type="text"
          className="p-2 border-0 w-100"
          id={label}
          maxLength={100}
        />
      </div>
    </div>
  );
};

export default memo(SocialMediaInput, isEqual);
