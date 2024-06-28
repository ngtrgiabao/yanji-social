import { memo } from "react";
import isEqual from "react-fast-compare";
import Navigation from "./navigation";

function Header({ title, link, isSearch = true }) {
  return (
    <>
      <Navigation title={title} link={link} isSearch={isSearch} />
    </>
  );
}

export default memo(Header, isEqual);
