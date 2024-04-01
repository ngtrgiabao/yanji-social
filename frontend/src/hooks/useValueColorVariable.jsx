const getColorCode = (borderColor, btn) => {
  const computedStyle = window.getComputedStyle(btn);
  const colorValue = computedStyle.getPropertyValue(borderColor).trim();
  return colorValue;
};

const getValueColorVariable = (colorString) => {
  const regex = /var\((--[\w-]+)\)/;
  const match = colorString.match(regex);
  return match ? match[1] : null;
};

export { getValueColorVariable, getColorCode };
