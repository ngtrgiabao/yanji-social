import NETWORK_BG from "../../assets/background/network-error.webp";

import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NetworkError = () => {
    return (
        <div
            className="w-100 d-flex justify-content-center align-items-center bg-black fs-1 flex-column"
            style={{
                height: "100vh",
            }}
        >
            <FontAwesomeIcon
                icon={faWifi}
                className="mb-4 text-white"
                style={{
                    fontSize: "5rem",
                }}
            />

            <div
                className="d-flex justify-content-center align-items-center bg-danger fw-bold text-white p-2 px-3 text-uppercase"
                style={{
                    borderRadius: "1rem",
                }}
            >
                please check your network and reload this page :/
            </div>
        </div>
    );
};

export default NetworkError;
