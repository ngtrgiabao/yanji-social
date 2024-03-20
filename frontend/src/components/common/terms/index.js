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

export { linkData, socialLinks };