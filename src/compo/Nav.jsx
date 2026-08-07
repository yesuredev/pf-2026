import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.scss";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // 메뉴 링크 클릭 시 메뉴 닫기
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className={styles.header}>
      {/* 1. 상단 바 (로고 + 토글 버튼) */}
      <div className={styles.topBar}>
        <NavLink
          to="/"
          className={styles.logo}
          onClick={closeMenu}
          data-cursor-text="HOME"
          data-cursor-color="rgba(0, 0, 0, .5)"
        >
          deveb
        </NavLink>

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

      {/* 2. 원형으로 펼쳐지는 오버레이 메뉴 */}
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
            {/* <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={closeMenu}
              >
                About
              </NavLink>
            </li> */}
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
