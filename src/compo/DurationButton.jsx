import { useState } from "react";
import styles from "./DurationButton.module.scss"; // scss 파일명에 맞게 확인해주세요!

const DurationButton = ({
  label,
  badge,
  className = "",
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const [hoverState, setHoverState] = useState("idle");

  const handleMouseEnter = (e) => {
    setHoverState("enter");
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e) => {
    setHoverState("leave");
    if (onMouseLeave) onMouseLeave(e);
  };

  const stateClass =
    hoverState === "enter"
      ? styles.isEnter
      : hoverState === "leave"
        ? styles.isLeave
        : "";

  return (
    <button
      className={`${styles.slideBtn} ${stateClass} ${className}`.trim()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className={styles.label}>{label}bbuuttoonn</span>
      {badge !== undefined && <span className={styles.badge}>{badge}</span>}
    </button>
  );
};

export default DurationButton;
