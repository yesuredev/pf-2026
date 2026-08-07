import React, { useRef } from "react";
import gsap from "gsap";

const Magnetic = ({
  children,
  proximity = 1, // 마중 나가는 레이더 반경 (기본값 60px)
  strength = 0.1, // 도형 전체가 따라가는 강도
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

    // 1. 메인 타겟(도형) 이동
    gsap.to(targetRef.current, {
      x: distanceX * strength,
      y: distanceY * strength,
      duration: 0.1,
      ease: "power2.out",
    });

    // 2. 패럴랙스 입체감을 줄 내부 텍스트 이동
    // 자식 요소 중에 'magnetic-inner'라는 클래스가 있으면 자동으로 인식해서 미세하게 움직여줍니다!
    const innerTarget = targetRef.current.querySelector(".magnetic-inner");
    if (innerTarget) {
      gsap.to(innerTarget, {
        x: distanceX * innerStrength,
        y: distanceY * innerStrength,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!targetRef.current) return;

    // 마우스가 레이더 반경을 벗어나면 제자리로 튕기듯 복귀
    gsap.to(targetRef.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });

    const innerTarget = targetRef.current.querySelector(".magnetic-inner");
    if (innerTarget) {
      gsap.to(innerTarget, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
      });
    }
  };

  return (
    // 이 영역이 '레이더망' 역할을 합니다.
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "inline-flex",
        padding: `${proximity}px`, // 프롭스로 받은 반경 크기 적용
        margin: `${-proximity}px`,
      }}
    >
      {/* 이 div 안의 내용물이 실제로 움직이는 타겟이 됩니다 */}
      <div ref={targetRef}>{children}</div>
    </div>
  );
};

export default Magnetic;
