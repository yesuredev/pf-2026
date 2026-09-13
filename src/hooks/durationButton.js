import { useState } from "react";

const useDirectionalHover = () => {
  // 'idle' | 'enter' | 'leave'
  const [hoverState, setHoverState] = useState("idle");

  const onMouseEnter = () => {
    setHoverState("enter");
  };

  const onMouseLeave = () => {
    setHoverState("leave");
  };

  return {
    hoverState,
    isEnter: hoverState === "enter",
    isLeave: hoverState === "leave",
    hoverProps: {
      onMouseEnter,
      onMouseLeave,
    },
  };
};

export default useDirectionalHover;
