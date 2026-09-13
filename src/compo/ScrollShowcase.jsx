import React, { useEffect } from "react";
import Magnetic from "./Magnetic.jsx"; // 🔥 만든 공통 컴포넌트 불러오기
import ahnlabEDR from "../assets/ahnlab_edr_2_0_1x.webp";
import ahnlabEPP from "../assets/ahnlab_epp_1x.webp";
import unpackedJan2025 from "../assets/galaxy_unpacked_2025_january_1x.webp";
import unpackedjul2025 from "../assets/galaxy_unpacked_2025_july_1x.webp";
import "./ScrollShowcase.scss";
// 1. 데이터에 각 프로젝트별 커서 텍스트와 색상 추가
const SHOWCASE_DATA = [
  {
    id: 1,
    title: "Vimcosmo.com",
    description: "Beauty brand, e-commerce",
    image: unpackedjul2025,
    cursorText: "VISIT",
    cursorColor: "rgba(230, 103, 103, .7)",
  },
  {
    id: 2,
    title: "DopeGood.com",
    description: "Furniture brand, Online store",
    image: unpackedJan2025,
    cursorText: "VIEW",
    cursorColor: "rgba(43, 112, 246, .7)",
  },
  {
    id: 3,
    title: "AM-ARC.com",
    description: "Architectural design studio",
    image: ahnlabEDR,
    cursorText: "ARCHIVE",
    cursorColor: "rgba(46, 213, 115, .7)",
  },
  {
    id: 4,
    title: "Dopop.net",
    description: "NFT digital marketplace",
    image: ahnlabEPP,
    cursorText: "NFT",
    cursorColor: "rgba(255, 165, 2, .7)",
  },
  {
    id: 5,
    title: "Old.DopeGood.com",
    description: "Furniture brand, e-commerce",
    image:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1000",
    cursorText: "OLD",
    cursorColor: "rgba(30, 144, 255, .7)",
  },
];
export default function ScrollShowcase() {
  useEffect(() => {
    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let isRunning = false;
    let rafId = null;
    // 감속 계수 (0.05 ~ 0.1 사이: 낮을수록 더 부드럽고 묵직함)
    const ease = 0.15;
    const onWheel = (e) => {
      // 뚝뚝 끊기는 브라우저 기본 휠 스크롤 차단
      e.preventDefault();
      // 전체 스크롤 가능 범위 내에서 targetY 누적
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      targetY = Math.max(0, Math.min(targetY + e.deltaY, maxScroll));
      // 휠 회전 시작 시에만 rAF 루프 실행
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(smoothScroller);
      }
    };
    const smoothScroller = () => {
      currentY += (targetY - currentY) * ease;
      window.scrollTo(0, currentY);
      // 목표 위치까지 0.5px 미만으로 좁혀지면 루프 정지 (자원 점유 해제)
      if (Math.abs(targetY - currentY) > 0.5) {
        rafId = requestAnimationFrame(smoothScroller);
      } else {
        window.scrollTo(0, targetY);
        currentY = targetY;
        isRunning = false;
      }
    };
    // preventDefault를 위해 passive: false 설정
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
  return (
    <div className="scroll-showcase-container">
      <div className="scroll-area">
        <div className="sticky-viewport">
          {/* 텍스트 영역 */}
          <div className="text-window">
            <div className="text-strip">
              {SHOWCASE_DATA.map((item) => (
                <div key={item.id} className="text-item">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <Magnetic proximity={40} strength={0.2} innerStrength={0.1}>
                    <a href="javascript:;">view</a>
                  </Magnetic>
                </div>
              ))}
            </div>
          </div>
          {/* 이미지 영역 (마우스 커서 인터랙션 바인딩) */}
          <div className="image-window">
            <div className="image-strip">
              {SHOWCASE_DATA.map((item) => (
                <div
                  key={item.id}
                  className="image-item"
                  /* 2. 동적 데이터 바인딩 */
                  data-cursor-text={item.cursorText}
                  data-cursor-color={item.cursorColor}
                >
                  <img src={item.image} alt={item.title} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
