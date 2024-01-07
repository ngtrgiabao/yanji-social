const useCopyUrl = (url) => {
  navigator.clipboard
    .writeText(url)
    .then(() => {
      setIsCopied(true);
    })
    .catch((error) => {
      console.error("Failed to copy URL", error);
    });
};

export default useCopyUrl;
