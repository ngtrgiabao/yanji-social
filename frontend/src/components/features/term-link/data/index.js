import { RouteNames } from "../../../../constant/routes";

const linkData = {
  privacy: { title: "Quyền riêng tư", link: RouteNames.PRIVACY_POLICY },
  terms: { title: "Điều khoản", link: RouteNames.TERM_AND_SERVICE },
  ads: { title: "Quảng cáo", link: RouteNames.HOME },
  adChoices: { title: "Lựa chọn quảng cáo", link: RouteNames.HOME },
  cookies: { title: "Cookies", link: RouteNames.COOKIE_POLICY },
  more: { title: "Xem thêm", link: RouteNames.HOME },
  copyright: {
    title: "Yanji © 2023",
    link: "https://yanji-porfolio.vercel.app/",
  },
};

const termLinks = [
  { id: 1, ...linkData.privacy },
  { id: 2, ...linkData.terms },
  { id: 3, ...linkData.ads },
  { id: 4, ...linkData.adChoices },
  { id: 5, ...linkData.cookies },
  { id: 6, ...linkData.more },
  { id: 7, ...linkData.copyright },
];

export { linkData, termLinks };
