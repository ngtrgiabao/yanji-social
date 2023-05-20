import React from "react";

import {
    UilGraduationCap,
    UilHeart,
    UilInstagram,
    UilLinkedin,
    UilGithubAlt,
} from "@iconscout/react-unicons";

import "../../../../style/pages/personal/body/introduce/introduce.css";

import Stories from "../stories/Stories";
import Gallery from "../gallery/Gallery";

function Introduce() {
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

    return (
        <div>
            <p className="fs-1 fw-bold">Introduce</p>
            <div className="d-flex flex-column align-items-center fs-4">
                <p className="inline-block">Frontend Developer</p>
                <p className="inline-block">😁 Halo, Wie gehts 😁</p>
            </div>
            <button role="button" className="my-4">
                Edit Slogan
            </button>

            {renderIntroduceInfo()}

            <button role="button" className="my-4">
                Edit Details
            </button>
            <button role="button" className="mb-4">
                Add Hobbies
            </button>

            <Stories />

            <button role="button" className="mt-5 mb-4">
                Edit Stories
            </button>

            <Gallery />
        </div>
    );
}

export default Introduce;
