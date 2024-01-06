const Avatar = ({ imageSrc, label }) => {
  return (
    <img
      loading="lazy"
      role="presentation"
      decoding="async"
      src={imageSrc}
      alt={label}
      className="w-100"
    />
  );
};

export default Avatar;
