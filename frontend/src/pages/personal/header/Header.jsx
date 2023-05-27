import { UilCamera } from "@iconscout/react-unicons";

import "../../../style/pages/personal/header/header.css";
import coverImg from "../../../assets/background/coverfb.jpg";

function Header() {
    return (
        <div className="cover position-relative">
            <span className="position-relative">
                <img
                    loading="lazy"
                    role="presentation"
                    decoding="async"
                    src={coverImg}
                    alt="Background cover"
                />

                <div className="edit-cover d-flex align-items-center">
                    <span className="me-3">
                        <UilCamera />
                    </span>
                    Edit cover
                </div>
            </span>
        </div>
    );
}

export default Header;
