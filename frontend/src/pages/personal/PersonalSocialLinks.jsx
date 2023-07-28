import "../../style/pages/personal/personalSocialLinks.css";

const PersonalSocialLinks = () => {
    const socialLinks = [
        {
            id: 1,
            title: "Quyền riêng tư",
        },
        {
            id: 2,
            title: "Điều khoản",
        },
        {
            id: 3,
            title: "Quảng cáo",
        },
        {
            id: 4,
            title: "Lựa chọn quảng cáo ●",
        },
        {
            id: 5,
            title: "Cookie",
        },
        {
            id: 6,
            title: "Xem thêm",
        },
        {
            id: 7,
            title: "Yanji © 2023",
        },
    ];

    const renderSocialLinks = () => {
        return socialLinks.map((item, index) => (
            <li key={item.id} className="me-1 d-flex align-items-center">
                <a href="#">{item.title}</a>
                {index !== socialLinks.length - 1 && (
                    <span className="mx-2">●</span>
                )}
            </li>
        ));
    };

    return (
        <div>
            <ul className="p-1 m-0 d-flex flex-wrap">{renderSocialLinks()}</ul>
        </div>
    );
};

export default PersonalSocialLinks;
