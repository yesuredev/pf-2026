import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Magnetic from "./Magnetic.jsx"; // 🔥 만든 공통 컴포넌트 불러오기
import "./GetInTouch.scss";

// BubbleShape 컴포넌트 로직 (이전과 동일)
const BubbleShape = ({ color, fillColor }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="415"
    height="415"
    viewBox="0 0 415 415"
    fill={color}
  >
    <path
      d="M414.5 192.985C414.831 197.781 415 202.621 415 207.5C415 322.099 322.099 415 207.5 415C92.9009 415 0 322.099 0 207.5C0 92.9009 92.9009 0 207.5 0C253.587 0 296.163 15.0281 330.601 40.4473C341.579 24.8631 369.826 0 414.5 0V192.985Z"
      fill={fillColor}
    />
  </svg>
);

const GetInTouch = () => {
  const buttonRef = useRef(null);
  const fillRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.set(fillRef.current, { clipPath: "circle(0% at 50% 50%)" });
  }, []);

  // [오직 진입점 기준 리플 효과 로직만 남음]
  const handleButtonEnter = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    gsap.fromTo(
      fillRef.current,
      { clipPath: `circle(0% at ${relX}px ${relY}px)` },
      {
        clipPath: `circle(150% at ${relX}px ${relY}px)`,
        duration: 0.6,
        ease: "power2.out",
      },
    );
    gsap.to(textRef.current, { color: "#fff", duration: 0.3 });
  };

  const handleButtonLeave = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    gsap.to(fillRef.current, {
      clipPath: `circle(0% at ${relX}px ${relY}px)`,
      duration: 0.6,
      ease: "power2.out",
    });
    gsap.to(textRef.current, { color: "#111", duration: 0.3 });
  };

  return (
    // 🔥 그냥 Magnetic 컴포넌트로 전체를 감싸주기만 하면 끝입니다!
    // 반경(proximity)을 40px로 타이트하게 줬습니다.
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

        <div className="fill-layer" ref={fillRef}>
          <BubbleShape fillColor="#111111" />
        </div>

        {/* 🔥 핵심: 텍스트에 'magnetic-inner' 클래스만 추가해주면 알아서 패럴랙스가 먹힙니다! */}
        <div className="text-container magnetic-inner" ref={textRef}>
          <p>Get in touch</p>
          <span className="arrow">→</span>
        </div>
      </div>
    </Magnetic>
  );
};

export default GetInTouch;
