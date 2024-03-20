import { SocialLink } from "..";
import { socialLinks } from "../common/terms";

const TermLinks = () => {
  const renderSocialLinks = () =>
    socialLinks.map((item, index) => (
      <SocialLink
        key={item?.id}
        id={item?.id}
        title={item?.title}
        link={item?.link}
        isLast={index === socialLinks.length - 1}
      />
    ));

  return (
    <ul className="p-3 m-0 d-flex align-items-center flex-wrap">
      {renderSocialLinks()}
    </ul>
  );
};

export default TermLinks;
