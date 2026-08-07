import React, { useEffect, useState, useRef } from "react";
import styles from "./CustomCursor.module.scss";

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  // 마우스의 마지막 X, Y 좌표를 기억할 Ref (리렌더링 방지)
  const lastMousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // 좌표 감지 및 요소 체크 함수
    const updateCursorTarget = (x, y) => {
      // 해당 (x, y) 좌표 바로 아래에 있는 최상위 DOM 요소를 찾음
      const elementUnderCursor = document.elementFromPoint(x, y);

      if (elementUnderCursor) {
        // data-* 속성을 가진 가장 가까운 부모 요소를 찾음
        const target = elementUnderCursor.closest(
          "[data-cursor-text], [data-cursor-color]",
        );

        if (target) {
          const text = target.getAttribute("data-cursor-text") || "";
          setCursorText(text);

          const color = target.getAttribute("data-cursor-color");
          if (color) {
            document.documentElement.style.setProperty("--cursor-color", color);
          }

          document.documentElement.setAttribute("data-cursor-active", "true");
          return;
        }
      }

      // 커서 영역 벗어났을 때 초기화
      setCursorText("");
      document.documentElement.style.removeProperty("--cursor-color");
      document.documentElement.removeAttribute("data-cursor-active");
    };

    // 1. 마우스가 움직일 때 (좌표 저장 + 상태 업데이트)
    const handleMouseMove = (e) => {
      lastMousePos.current = { x: e.clientX, y: e.clientY };

      document.documentElement.style.setProperty("--x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--y", `${e.clientY}px`);

      updateCursorTarget(e.clientX, e.clientY);
    };

    // 2. 스크롤할 때 (마우스는 가만히 있어도 내 좌표 밑의 요소 체크)
    const handleScroll = () => {
      const { x, y } = lastMousePos.current;
      updateCursorTarget(x, y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    // capture: true로 내부에 overflow scroll 영역이 있어도 스크롤 감지
    window.addEventListener("scroll", handleScroll, {
      capture: true,
      passive: true,
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll, { capture: true });
    };
  }, []);

  return (
    <div className={styles.cursor}>
      {cursorText && <span className={styles.text}>{cursorText}</span>}
    </div>
  );
}
