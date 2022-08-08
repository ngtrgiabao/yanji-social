import React from "react";

import "./body.css";
import {
    UilGraduationCap,
    UilHeart,
    UilInstagram,
    UilLinkedin,
    UilGithubAlt,
} from "@iconscout/react-unicons";
import Stories from "./stories/Stories";
import Gallery from "./gallery/Gallery";
import Friends from "./friends/Friends";
import avatarImg from "../../../images/profile-pic.png";

const introDuceIInfo = [
    {
        id: 1,
        title: "Học Software Engineering tại",
        link: " Đại học Cần Thơ - Can Tho University",
        icon: UilGraduationCap,
    },
    {
        id: 2,
        title: "Độc thân",
        icon: UilHeart,
    },
    {
        id: 3,
        title: "",
        link: "Có 32.743 người theo dõi",
        icon: UilInstagram,
    },
    {
        id: 4,
        title: "",
        link: "gbao",
        icon: UilLinkedin,
    },
    {
        id: 5,
        title: "",
        link: "ngtrgiabao",
        icon: UilGithubAlt,
    },
];

const socialLinks = [
    {
        id: 1,
        title: "Quyền riêng tư ●",
    },
    {
        id: 2,
        title: "Điều khoản ●",
    },
    {
        id: 3,
        title: "Quảng cáo ●",
    },
    {
        id: 4,
        title: "Lựa chọn quảng cáo ●",
    },
    {
        id: 5,
        title: "Cookie ●",
    },
    {
        id: 6,
        title: "Xem thêm ●",
    },
    {
        id: 7,
        title: "Yanji © 2022",
    },
];

function Body() {
    return (
        <div className="row place-items-center gap-3">
            <div className="col p-4">
                <div className="row p-3">
                    <p className="fs-1 fw-bold">Introduce</p>
                    <div className="d-flex flex-column align-items-center fs-4">
                        <p className="inline-block">Frontend Developer</p>
                        <p className="inline-block">😁 Halo, Wie gehts 😁</p>
                    </div>
                    <button className="my-4">Edit Slogan</button>
                    {introDuceIInfo.map((item) => {
                        return (
                            <div key={item.id} className="fs-4 d-flex my-2">
                                <item.icon />
                                <p className="ms-3">
                                    {item.title}
                                    <a className="m-0" href="#">
                                        {item.link}
                                    </a>
                                </p>
                            </div>
                        );
                    })}
                    <button className="my-4">Edit Details</button>
                    <button className="mb-4">Add Hobbies</button>
                    <Stories />
                    <button className="mt-5 mb-4">Edit Stories</button>
                    <Gallery />
                </div>
                <div className="row p-3">
                    <Friends />
                </div>
                <div className="row p-3">
                    <ul className="m-0 d-flex flex-wrap">
                        {socialLinks.map((item) => (
                            <li key={item.id} className="me-1">
                                <a href="#">{item.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="col-7">
                <p className="fs-1 fw-bold">Introduce</p>

                <div className="row border border-primary">
                    <div className="profile-pic p-0 rounded-circle overflow-hidden">
                        <img src={avatarImg} alt="avatar" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Body;
