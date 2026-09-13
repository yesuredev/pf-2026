import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./compo/Header";
import Home from "./pages/Home";
import Works from "./pages/Works";
import CustomCursor from "./compo/CustomCursor";

import "./App.css";

// 공통 레이아웃 (페이지가 바뀌어도 Nav는 상단에 유지됨)
function Layout() {
  return (
    <>
      <Header />
      <main>
        <CustomCursor />
        <Outlet />{" "}
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
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
