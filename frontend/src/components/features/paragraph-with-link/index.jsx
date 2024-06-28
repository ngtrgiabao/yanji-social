import { memo } from "react";
import isEqual from "react-fast-compare";

import { URL_SPLIT_REGEX, YOUTUBE_REGEX } from "../../../utils/regex";
import YoutubeEmbed from "../../common/embed/youtube-embed";

const ParagraphWithLink = ({ text }) => {
  const parts = text?.split("\n");

  const textOverflow = {
    overflow: "hidden",
    display: "inline-block",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
  };

  return parts?.map((part, index) => {
    if (part.match(URL_SPLIT_REGEX)) {
      if (part.match(YOUTUBE_REGEX)) {
        const videoId = part.match(YOUTUBE_REGEX)[1];
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;

        return (
          <p key={index}>
            <a
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-underline"
              style={{
                ...textOverflow,
                color: "var(--color-primary)",
                maxWidth: "100%",
                whiteSpace: "nowrap",
              }}
              data-href="youtube-link"
            >
              {part}
            </a>
            <YoutubeEmbed embedURL={embedUrl} />
          </p>
        );
      }

      return (
        <a
          href={part}
          key={index}
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-underline"
          style={{
            ...textOverflow,
            color: "var(--color-primary)",
            maxWidth: "100%",
          }}
          data-href="social-link"
        >
          {part}
        </a>
      );
    } else {
      return <p key={index}>{part}</p>;
    }
  });
};

export default memo(ParagraphWithLink, isEqual);
