import React from "react";

import "./socialLinks.css";


function SocialLinks() {
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

    return (
        <div>
            <ul className="m-0 d-flex flex-wrap">
                {socialLinks.map((item) => (
                    <li key={item.id} className="me-1">
                        <a href="#">{item.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SocialLinks;
