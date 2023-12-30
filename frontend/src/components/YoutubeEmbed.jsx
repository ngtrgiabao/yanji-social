import React from "react";

const YoutubeEmbed = ({ embedURL }) => {
  return (
    <iframe
      width="100%"
      height="315"
      src={embedURL}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className="my-2"
      style={{
        maxWidth: "100%",
      }}
    ></iframe>
  );
};

export default YoutubeEmbed;
