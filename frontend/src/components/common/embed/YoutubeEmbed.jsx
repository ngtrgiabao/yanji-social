import React from "react";
import getYouTubeID from "get-youtube-id";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const liteYoutubeEmbedProps = (youtubeId) => {
  return {
    title: "youtube video",
    noCookie: true,
    thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
    poster: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
  };
};

const YoutubeEmbed = ({ embedURL }) => {
  const youtubeId = getYouTubeID(embedURL);

  return (
    <LiteYouTubeEmbed id={youtubeId} {...liteYoutubeEmbedProps(youtubeId)} />
  );
};

export default YoutubeEmbed;
