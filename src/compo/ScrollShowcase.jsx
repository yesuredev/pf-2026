import React from "react";
import Magnetic from "./Magnetic.jsx"; // 🔥 만든 공통 컴포넌트 불러오기
import "./ScrollShowcase.scss";

// 1. 데이터에 각 프로젝트별 커서 텍스트와 색상 추가
const SHOWCASE_DATA = [
  {
    id: 1,
    title: "Vimcosmo.com",
    description: "Beauty brand, e-commerce",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000",
    cursorText: "VISIT",
    cursorColor: "rgba(230, 103, 103, .7)",
  },
  {
    id: 2,
    title: "DopeGood.com",
    description: "Furniture brand, Online store",
    image:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1000",
    cursorText: "VIEW",
    cursorColor: "rgba(43, 112, 246, .7)",
  },
  {
    id: 3,
    title: "AM-ARC.com",
    description: "Architectural design studio",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000",
    cursorText: "ARCHIVE",
    cursorColor: "rgba(46, 213, 115, .7)",
  },
  {
    id: 4,
    title: "Dopop.net",
    description: "NFT digital marketplace",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1000",
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
