import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Nav from "./compo/Nav.jsx";
import Home from "./pages/Home.jsx";
import Works from "./pages/Works.jsx";
import CustomCursor from "./compo/CustomCursor.jsx";

// import Main from "./assets/HorizontalScroll.jsx";
import "./App.css";

// 공통 레이아웃 (페이지가 바뀌어도 Nav는 상단에 유지됨)
function Layout() {
  return (
    <>
      <Nav />
      <main>
        <CustomCursor />
        <Outlet />{" "}
        {/* 라우트 경로에 따라 변경될 페이지 컴포넌트가 들어오는 위치 */}
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/pf-2026">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="about" element={<About />} /> */}
          <Route path="works" element={<Works />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// function App() {

//   return (
//     <>
//       <Nav />
//       <ParallaxThumbs />
//       <ImageCross />
//       <ImageDriven />
//       <Curtain />
//       <HorizontalScroll />
//       <Main />
//       <GetInTouch />
//     </>
//   );
// }

// export default App;
