import React, { useRef } from "react";

const Magnetic = ({
  children,
  proximity = 20, // 마중 나가는 레이더 반경
  strength = 0.2, // 도형 전체가 따라가는 강도
  innerStrength = 0.1, // 내부 텍스트가 따라가는 강도 (입체감 패럴랙스용)
}) => {
  const targetRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!targetRef.current) return;

    // 타겟의 정중앙 좌표 계산
    const rect = targetRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // 1. 마우스 이동 추적 시: 짧고 부드러운 Ease-Out 적용
    const trackTransition =
      "transform 0.1s cubic-bezier(0.215, 0.61, 0.355, 1)";

    targetRef.current.style.transition = trackTransition;
    targetRef.current.style.transform = `translate3d(${distanceX * strength}px, ${distanceY * strength}px, 0)`;

    // 2. 패럴랙스 입체감을 줄 내부 텍스트 이동 (.magnetic-inner)
    const innerTarget = targetRef.current.querySelector(".magnetic-inner");
    if (innerTarget) {
      innerTarget.style.transition =
        "transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1)";
      innerTarget.style.transform = `translate3d(${distanceX * innerStrength}px, ${distanceY * innerStrength}px, 0)`;
    }
  };

  const handleMouseLeave = () => {
    if (!targetRef.current) return;

    // 복귀 시: GSAP elastic.out과 거의 동일한 튕김을 구현하는 cubic-bezier
    const elasticTransition =
      "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";

    // 1. 메인 타겟 원위치
    targetRef.current.style.transition = elasticTransition;
    targetRef.current.style.transform = "translate3d(0px, 0px, 0)";

    // 2. 내부 텍스트 원위치
    const innerTarget = targetRef.current.querySelector(".magnetic-inner");
    if (innerTarget) {
      innerTarget.style.transition = elasticTransition;
      innerTarget.style.transform = "translate3d(0px, 0px, 0)";
    }
  };

  return (
    <div
      className="proximity-area"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "inline-flex",
        padding: `${proximity}px`,
        margin: `${-proximity}px`,
      }}
    >
      <div ref={targetRef} style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
};

export default Magnetic;
