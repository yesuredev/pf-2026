import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`${styles.header} ${!isHome ? styles.subpage : ""} ${
        isOpen ? styles.menuOpen : ""
      }`}
    >
      {/* 1. 상단 바 (우측 햄버거 토글 버튼) */}
      <div className={styles.topBar}>
        <button
          type="button"
          className={`${styles.hamburgerBtn} ${isOpen ? styles.active : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          data-cursor-text="SITE MAP"
          data-cursor-color="rgba(0, 0, 0, .5)"
        >
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </button>
      </div>

      {/* 2. LIKOVA 홈 이동 로고 (홈: 스크롤 축소 / 서브: 상단 고정) */}
      <div className={styles.floatingLogoArea}>
        <NavLink
          to="/"
          onClick={closeMenu}
          data-cursor-text="HOME"
          data-cursor-color="rgba(0, 0, 0, .5)"
        >
          <h1 className={styles.logoText}>LIKOVA</h1>
        </NavLink>
      </div>

      {/* 3. 화이트 배경 레이아웃 (Home 전용) */}
      {isHome && (
        <div className={styles.heroBg}>
          <div className={styles.whiteBarTop}></div>
          <div className={styles.whiteBoxLikova}></div>
        </div>
      )}

      {/* 4. 원형 확장 오버레이 메뉴 */}
      <div className={`${styles.menuOverlay} ${isOpen ? styles.open : ""}`}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/works"
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={closeMenu}
              >
                Works
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
