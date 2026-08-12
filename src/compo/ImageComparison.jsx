import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./ImageComparison.module.scss";

// 테스트용 Unsplash 고화질 무료 이미지 URL (이미지 A: 산/자연, 이미지 B: 도심/건축)
const DEFAULT_IMAGE_A =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80";
const DEFAULT_IMAGE_B =
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80";

export default function ImageComparison({
  srcA = DEFAULT_IMAGE_A,
  srcB = DEFAULT_IMAGE_B,
}) {
  const [pos, setPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const SNAP_THRESHOLD = 3;
  // 마우스/터치 좌표 기준으로 박스 내 비율 계산
  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percent = Math.max(0, Math.min(100, (x / rect.width) * 100));

    // ★ [자석 스냅 로직] 정중앙(50%) 오차범위 내에 들면 50으로 고정
    if (Math.abs(percent - 50) < SNAP_THRESHOLD) {
      percent = 50;
    }

    setPos(percent);
  }, []);

  // 드래그 중일 때만 전역 mousemove/mouseup 이벤트 연결
  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e) =>
      updatePosition(e.touches ? e.touches[0].clientX : e.clientX);
    const handleEnd = () => setIsDragging(false);

    // 등록할 [이벤트명, 핸들러] 쌍을 배열로 묶기
    const events = [
      ["mousemove", handleMove],
      ["touchmove", handleMove],
      ["mouseup", handleEnd],
      ["touchend", handleEnd],
    ];

    // 등록
    events.forEach(([type, listener]) =>
      window.addEventListener(type, listener),
    );

    // 해제
    return () => {
      events.forEach(([type, listener]) =>
        window.removeEventListener(type, listener),
      );
    };
  }, [isDragging, updatePosition]);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{ "--pos": `${pos}%` }}
      onMouseDown={(e) => {
        setIsDragging(true);
        updatePosition(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        updatePosition(e.touches[0].clientX);
      }}
      // 전역 CustomCursor.jsx 연동용 속성
      data-cursor-text="DRAG"
    >
      {/* 이미지 B (베이스 / 우측 50% 영역 강한 블러) */}
      <div className={`${styles.imageLayer} ${styles.imageB}`}>
        <img src={srcB} alt="Image B" draggable={false} />
        {/* <div className={styles.blurOverlay} /> */}
      </div>

      {/* 이미지 A (상단 / 왼쪽에서 드래그 위치까지 노출) */}
      <div className={`${styles.imageLayer} ${styles.imageA}`}>
        <img src={srcA} alt="Image A" draggable={false} />
      </div>

      {/* 드래그 핸들 */}
      <div className={styles.divider}>
        <div className={styles.handle}>◄ ►</div>
      </div>
    </div>
  );
}
