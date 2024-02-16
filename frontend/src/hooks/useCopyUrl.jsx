const useCopyUrl = (url) => {
  navigator.clipboard
    .writeText(url)
    .then(() => {
      setIsCopied(true);
    })
    .catch((error) => {
      console.error("[COPY_POST_URL]", error);
    });
};

export default useCopyUrl;
