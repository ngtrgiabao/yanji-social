const useDownloadImage = (imgSrc) => {
  const downloadImage = async () => {
    try {
      const response = await fetch(imgSrc);
      const blob = await response.blob();

      const anchor = document.createElement("a");
      anchor.href = URL.createObjectURL(blob);
      anchor.download = "image.jpg";
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } catch (error) {
      console.error("[DOWNLOAD_IMAGE]", error);
    }
  };

  return downloadImage;
};

export default useDownloadImage;
