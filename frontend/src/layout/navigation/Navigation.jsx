import { Link, useNavigate } from "react-router-dom";
import { UilSearch } from "@iconscout/react-unicons";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";

import "../../style/layouts/navigation.css";

import ProfilePic from "../../assets/avatar/profile-pic.png";

import { logout } from "../../redux/request/authRequest";

const Navigation = ({ title, link }) => {
    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(dispatch, navigate);
    };

    const renderSwitchBtn = () => {
        return currentUser ? (
            <Link
                to="/logout"
                className="btn btn-danger d-flex align-items-center justify-content-center gap-4"
                htmlFor="#logout"
                onClick={handleLogout}
            >
                Logout
            </Link>
        ) : (
            <Link
                to={link}
                className="nav__btn d-flex align-items-center justify-content-center gap-4"
                htmlFor="#create-post"
            >
                {title}
            </Link>
        );
    };

    return (
        <>
            <nav className="py-3 header-navbar">
                <div
                    className="container d-flex align-items-center"
                    style={{ height: "100%" }}
                >
                    <Link to="/" className="logo mb-0">
                        Yanji Social
                    </Link>

                    <div className="search-bar d-flex align-items-center">
                        <UilSearch />
                        <Form.Control
                            className="ms-4"
                            type="search"
                            placeholder="Search for creators, ideas and projects"
                        />
                    </div>

                    <div className="d-flex justify-content-end align-items-center">
                        {renderSwitchBtn()}
                        <Link
                            aria-label="Avatar user"
                            to={currentUser ? `/user/${currentUser._id}` : "/"}
                            className="profile-pic ms-4"
                        >
                            <img
                                loading="lazy"
                                role="presentation"
                                decoding="async"
                                src={currentUser?.profilePicture || ProfilePic}
                                alt="Avatar user"
                            />
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;
