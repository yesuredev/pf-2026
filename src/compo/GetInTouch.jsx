import React, { useRef } from "react";
import Magnetic from "./Magnetic.jsx";
import "./GetInTouch.scss";

// BubbleShape 컴포넌트 (SCSS 연동을 위해 className="bubble-svg" 추가)
const BubbleShape = ({ fillColor }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="415"
    height="415"
    viewBox="0 0 415 415"
    fill="none"
    className="bubble-svg"
  >
    <path
      d="M414.5 192.985C414.831 197.781 415 202.621 415 207.5C415 322.099 322.099 415 207.5 415C92.9009 415 0 322.099 0 207.5C0 92.9009 92.9009 0 207.5 0C253.587 0 296.163 15.0281 330.601 40.4473C341.579 24.8631 369.826 0 414.5 0V192.985Z"
      fill={fillColor}
    />
  </svg>
);

const GetInTouch = () => {
  const buttonRef = useRef(null);

  // 마우스 위치 좌표를 CSS 변수(--rel-x, --rel-y)로 전달
  const updateMousePosition = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    buttonRef.current.style.setProperty("--rel-x", `${relX}px`);
    buttonRef.current.style.setProperty("--rel-y", `${relY}px`);
  };

  const handleButtonEnter = (e) => {
    updateMousePosition(e);
    buttonRef.current?.classList.add("is-hovered");
  };

  const handleButtonLeave = (e) => {
    updateMousePosition(e);
    buttonRef.current?.classList.remove("is-hovered");
  };

  return (
    <Magnetic proximity={20} strength={0.2} innerStrength={0.1}>
      <div
        className="button-inner"
        ref={buttonRef}
        onMouseEnter={handleButtonEnter}
        onMouseLeave={handleButtonLeave}
        data-cursor-text="Contract"
        data-cursor-color="#111111"
      >
        <div className="base-layer">
          <BubbleShape fillColor="#f2f2f2" />
        </div>

        <div className="fill-layer">
          <BubbleShape fillColor="#111111" />
        </div>

        <div className="text-container magnetic-inner">
          <p>Get in touch</p>
          <span className="arrow">→</span>
        </div>
      </div>
    </Magnetic>
  );
};

export default GetInTouch;
