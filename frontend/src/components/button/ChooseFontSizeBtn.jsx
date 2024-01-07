const ChooseFontSizeBtn = ({ fontSizeName, fontSize, onFontSizeChange }) => {
  return (
    <span
      key={fontSizeName}
      className={fontSizeName + (fontSize === fontSizeName ? " active" : "")}
      onClick={() => onFontSizeChange(fontSizeName)}
    ></span>
  );
};

export default ChooseFontSizeBtn;
