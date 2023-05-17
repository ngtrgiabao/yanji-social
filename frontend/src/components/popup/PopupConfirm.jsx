import React from "react";

import "../../style/components/popup/confirm.css";

const PopupConfirm = (props) => {
    const { title } = props;

    return (
        <div id="confirm" className="p-4" role="document">
            <div className="d-flex justify-content-between align-items-center fs-3 border-bottom text-white">
                <div className="fw-bold text-uppercase">{title}</div>
                <span
                    className="fs-1 close p-1"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    &times;
                </span>
            </div>
            <span className="py-4 pb-5 d-block fs-3 text-white">
                Bạn muốn xóa tin nhắn này?
            </span>
            <div className="fs-3 d-flex justify-content-end">
                <button className="py-2 p-4 me-2">
                    Close
                </button>
                <button className="py-2 p-4 fw-bold text-white bg-danger">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default PopupConfirm;
