import React from "react";
// import "./Home.scss";

// import Main from "../assets/Main.jsx";
import ScrollShowcase from "../compo/ScrollShowcase.jsx";
import Curtain from "../compo/Curtain.jsx";
import GetInTouch from "../compo/GetInTouch.jsx";
import ImageDriven from "../compo/ImageDriven.jsx";
import ImageCross from "../compo/ImageCross.jsx";
import ParallaxThumbs from "../compo/ParallaxThumbs.jsx";
import HorizontalScroll from "../compo/HorizontalScroll.jsx";

export default function Home() {
  return (
    <>
      {/* <Nav /> */}
      <ScrollShowcase />
      <HorizontalScroll />
      <ParallaxThumbs />
      <ImageCross />
      <ImageDriven />
      <Curtain />
      {/* <Main /> */}
      <GetInTouch />
    </>
  );
}
