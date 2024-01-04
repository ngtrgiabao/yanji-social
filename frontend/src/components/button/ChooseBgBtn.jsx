const ChooseBgBtn = ({ bgName, bgTheme, content, onBackgroundChange }) => {
  return (
    <div
      key={bgName}
      className={
        bgName + (bgTheme === bgName ? " active" : "")
      }
      onClick={() => onBackgroundChange(bgName)}
    >
      <span></span>
      <h5 htmlFor={bgName}>{content}</h5>
    </div>
  )
}

export default ChooseBgBtn;