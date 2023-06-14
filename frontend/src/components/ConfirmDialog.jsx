import "../style/pages/messages/middle/middle.css";

const ConfirmDialog = ({
    title,
    children,
    onClose,
    onConfirm,
    confirmButtonText,
}) => {
    return (
        <div
            className="confirm-container d-flex justify-content-center align-items-center"
            onClick={onClose}
        >
            <div
                id="confirm"
                className="confirm-container__dialog p-4"
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <span className="confirm-container__dialog-title d-block fs-3 text-white mb-2">
                        {title}
                    </span>
                )}
                <div className="confirm-container__dialog-review-image">
                    {children}
                </div>
                <div className="confirm-container__dialog-footer fs-5 d-flex justify-content-end mt-2">
                    <span
                        onClick={onClose}
                        className="confirm-container__dialog-close"
                    >
                        Close
                    </span>
                    <span
                        onClick={onConfirm}
                        className="confirm-container__dialog-confirm"
                    >
                        {confirmButtonText}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
