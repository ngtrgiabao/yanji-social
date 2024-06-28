import { memo } from "react";
import isEqual from "react-fast-compare";

function Explore() {
  return <div>hello</div>;
}

export default memo(Explore, isEqual);
