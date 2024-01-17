import { SocialLink } from "../../../components";

const PersonalSocialLinks = () => {
  const linkData = {
    privacy: { title: "Quyền riêng tư", link: "/privacy-policy" },
    terms: { title: "Điều khoản", link: "/term-and-service" },
    ads: { title: "Quảng cáo", link: "/" },
    adChoices: { title: "Lựa chọn quảng cáo", link: "/" },
    cookies: { title: "Cookies", link: "/cookie-policy" },
    more: { title: "Xem thêm", link: "/" },
    copyright: {
      title: "Yanji © 2023",
      link: "https://yanji-porfolio.vercel.app/",
    },
  };

  const socialLinks = [
    { id: 1, ...linkData.privacy },
    { id: 2, ...linkData.terms },
    { id: 3, ...linkData.ads },
    { id: 4, ...linkData.adChoices },
    { id: 5, ...linkData.cookies },
    { id: 6, ...linkData.more },
    { id: 7, ...linkData.copyright },
  ];

  const renderSocialLinks = () =>
    socialLinks.map((item, index) => (
      <SocialLink
        key={item.id}
        id={item.id}
        title={item.title}
        link={item.link}
        isLast={index === socialLinks.length - 1}
      />
    ));

  return (
    <div>
      <ul className="p-1 m-0 d-flex align-items-center flex-wrap">
        {renderSocialLinks()}
      </ul>
    </div>
  );
};

export default PersonalSocialLinks;
