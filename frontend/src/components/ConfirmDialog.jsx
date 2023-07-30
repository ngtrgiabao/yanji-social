import "../style/pages/messages/messagesMiddle.css";

const ConfirmDialog = ({
    title = "Title",
    children,
    onClose,
    onConfirm,
    confirmButtonText,
    isLoading,
}) => {
    return (
        <div
            className="customize-theme position-fixed confirm-container h-100 d-flex justify-content-center align-items-center"
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
                    <button
                        onClick={onConfirm}
                        className="confirm-container__dialog-confirm bg-transparent border-0"
                        disabled={isLoading}
                        style={
                            isLoading
                                ? { cursor: "default", color: "white" }
                                : null
                        }
                    >
                        {isLoading ? "Loading..." : confirmButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
