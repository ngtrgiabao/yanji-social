import { useEffect, useState } from "react";
import {
    UilGraduationCap,
    UilHeart,
    UilInstagram,
    UilLinkedin,
    UilGithubAlt,
} from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";

import "../../style/pages/personal/personalIntroduce.css";

import PersonalStories from "./PersonalStories";
import PersonalGallery from "./PersonalGallery";
import { getUserByID } from "../../redux/request/userRequest";

const PersonalIntroduce = ({ onUpdateBioPopup }) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        bio: "",
    });
    const currentUser = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const introduceInfo = [
        {
            id: 1,
            title: "Học Software Engineering tại Đại học Cần Thơ - Can Tho University",
            link: "",
            icon: UilGraduationCap,
            href: "",
        },
        {
            id: 2,
            title: "Độc thân",
            icon: UilHeart,
            href: "",
        },
        {
            id: 3,
            title: "",
            link: "Có 32.743 người theo dõi",
            icon: UilInstagram,
            href: "#",
        },
        {
            id: 4,
            title: "",
            link: "gbao",
            icon: UilLinkedin,
            href: "https://www.linkedin.com/in/gbao/",
        },
        {
            id: 5,
            title: "",
            link: "ngtrgiabao",
            icon: UilGithubAlt,
            href: "https://github.com/ngtrgiabaoB2012063",
        },
    ];

    const renderIntroduceInfo = () => {
        return introduceInfo.map((item) => (
            <div key={item.id} className="fs-4 d-flex my-2">
                <item.icon />
                <p className="ms-3">
                    {item.title}
                    <a
                        className={`m-0 link ${
                            item.href || item.link ? "link__color" : ""
                        }`}
                        href={item.href || "#"}
                    >
                        {item.link}
                    </a>
                </p>
            </div>
        ));
    };

    useEffect(() => {
        getUserByID(currentUser._id, dispatch).then((data) => {
            const { bio } = data.user;

            setUser({
                bio: bio,
            });
        });
    }, [currentUser._id, dispatch]);

    return (
        <>
            <p className="fs-1 fw-bold">Introduce</p>

            <div className="w-100">
                <div className="d-flex flex-column align-items-center fs-4">
                    <p className="inline-block text-break">{user.bio}</p>
                </div>
                <button className="my-4" onClick={() => onUpdateBioPopup()}>
                    Edit Bio
                </button>
            </div>

            {renderIntroduceInfo()}

            <button className="my-4">Edit Details</button>
            <button className="mb-4">Add Hobbies</button>

            <PersonalStories />

            <button className="mt-5 mb-4">Edit Stories</button>

            <PersonalGallery />
        </>
    );
};

export default PersonalIntroduce;
